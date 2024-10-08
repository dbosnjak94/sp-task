import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionService } from '../transactions/transaction.service';
import { AggregatedData } from './interfaces/aggregated-data.interface';
import { Aggregation } from './entities/aggregation.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class AggregationService {
  private readonly logger = new Logger(AggregationService.name);

  constructor(
    @InjectRepository(Aggregation)
    private aggregationRepository: Repository<Aggregation>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private readonly transactionService: TransactionService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async syncData() {
    try {
      const transactions = await this.transactionService.generateMockData(5);

      this.logger.log(`Generated ${transactions.length} mock transactions`);

      await this.storeTransactions(transactions);

      await this.processTransactions(transactions);

      this.logger.log('Sync process completed');
    } catch (error) {
      this.logger.error('Error during sync proces');
    }
  }

  private async storeTransactions(transactions: Transaction[]) {
    for (const transaction of transactions) {
      try {
        await this.transactionRepository.save(transaction);
      } catch (error) {
        this.logger.error(`Failed to store transaction for user`, error.stack);
      }
    }
    this.logger.log(
      `Stored ${transactions.length} transactions in the database`,
    );
  }

  private async processTransactions(transactions: Transaction[]) {
    for (const transaction of transactions) {
      let aggregation = await this.aggregationRepository.findOne({
        where: { userId: transaction.userId },
      });
      if (!aggregation) {
        aggregation = this.aggregationRepository.create({
          userId: transaction.userId,
          balance: 0,
          earned: 0,
          spent: 0,
          payout: 0,
          paidOut: 0,
        });
      }

      switch (transaction.type) {
        case 'earned':
          aggregation.earned += transaction.amount * 100;
          aggregation.balance += transaction.amount * 100;
          break;
        case 'spent':
          aggregation.spent += transaction.amount * 100;
          aggregation.balance -= transaction.amount * 100;
          break;
        case 'payout':
          aggregation.payout += transaction.amount * 100;
          aggregation.balance -= transaction.amount * 100;
          aggregation.paidOut += transaction.amount * 100;
          break;
      }

      await this.aggregationRepository.save(aggregation);

      this.logger.log(
        `Processed ${transactions.length} transactons for aggregation`,
      );
    }
  }

  async getAggregatedDataByUserId(
    userId: string,
  ): Promise<AggregatedData | null> {
    try {
      return await this.aggregationRepository.findOne({ where: { userId } });
    } catch (error) {
      this.logger.error(`Failed to get aggregated data for user`);
      return null;
    }
  }

  async getRequestedPayouts(): Promise<
    { userId: string; payoutAmount: number }[]
  > {
    try {
      const payouts = await this.aggregationRepository.find({
        select: ['userId', 'payout'],
      });
      return payouts.map((payout) => ({
        userId: payout.userId,
        payoutAmount: payout.payout,
      }));
    } catch (error) {
      this.logger.error('Failed to get requested payouts');
      return [];
    }
  }
}
