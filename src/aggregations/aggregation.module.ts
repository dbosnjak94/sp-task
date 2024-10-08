import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aggregation } from './entities/aggregation.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { AggregationService } from './aggregation.service';
import { AggregationController } from './aggregation.controller';
import { TransactionModule } from '../transactions/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aggregation, Transaction]),
    forwardRef(() => TransactionModule),
  ],
  controllers: [AggregationController],
  providers: [AggregationService],
  exports: [AggregationService],
})
export class AggregationModule {}
