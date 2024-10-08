import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.model';
import { AggregationModule } from './aggregations/aggregation.module';
import { TransactionModule } from './transactions/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TransactionModule,
    AggregationModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
