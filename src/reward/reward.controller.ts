import { Controller, Delete, Get, Post } from '@nestjs/common';
import { RewardService } from './reward.service';
import { Reward } from '@prisma/client';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('')
  async getReward(): Promise<Reward[]> {
    return this.rewardService.getReward();
  }

  @Delete('')
  async deleteAllReward(): Promise<null> {
    return this.rewardService.deleteReward();
  }

  @Post('')
  async createReward() {
    return this.rewardService.createReward();
  }
}
