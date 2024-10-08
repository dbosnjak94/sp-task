import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getTransactions(): Promise<Transaction[]> {
    try {
      return await this.transactionRepository.find();
    } catch (error) {
      throw new Error('Could not fetch transactions');
    }
  }

  async createTransaction(
    transaction: Partial<Transaction>,
  ): Promise<Transaction> {
    try {
      const newTransaction = this.transactionRepository.create(transaction);
      return await this.transactionRepository.save(newTransaction);
    } catch (error) {
      throw new Error('Could not create transaction');
    }
  }

  generateMockData(count: number): Transaction[] {
    const types: TransactionType[] = ['earned', 'spent', 'payout'];
    const userIds = ['1', '2', '3'];
    const mockTransactions: Transaction[] = [];

    for (let i = 0; i < count; i++) {
      const transaction = new Transaction();
      transaction.userId = userIds[Math.floor(Math.random() * userIds.length)];
      transaction.createdAt = new Date();
      transaction.type = types[
        Math.floor(Math.random() * types.length)
      ] as TransactionType;

      transaction.amount = +(Math.random() * 1000).toFixed(2);

      if (transaction.amount <= 0) {
        console.warn('Invalid transaction amount');
        continue;
      }

      mockTransactions.push(transaction);
    }

    return mockTransactions;
  }
}
