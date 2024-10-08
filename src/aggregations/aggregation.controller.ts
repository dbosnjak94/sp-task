import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AggregationService } from './aggregation.service';
import { AggregatedData } from './interfaces/aggregated-data.interface';

@Controller('aggregation')
export class AggregationController {
  constructor(private readonly aggregationService: AggregationService) {}

  @Get('user/:userId')
  async getAggregatedDataByUserId(
    @Param('userId') userId: string,
  ): Promise<AggregatedData> {
    const data =
      await this.aggregationService.getAggregatedDataByUserId(userId);
    if (!data) {
      throw new NotFoundException(`Agregated data not found for user`);
    }
    return data;
  }

  @Get('payouts')
  getRequestedPayouts(): Promise<{ userId: string; payoutAmount: number }[]> {
    return this.aggregationService.getRequestedPayouts();
  }
}
