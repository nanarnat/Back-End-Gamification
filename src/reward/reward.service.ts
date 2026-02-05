import { Injectable } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ScoreService } from '../score/score.service';

@Injectable()
export class RewardService {
  private readonly rewardRules = [
    { rewardType: 'A', requiredScore: 5000 },
    { rewardType: 'B', requiredScore: 10000 },
    { rewardType: 'C', requiredScore: 15000 },
  ];

  constructor(
    private prisma: PrismaService,
    private scoreService: ScoreService,
  ) {}

  async getReward(): Promise<Reward[]> {
    return this.prisma.reward.findMany();
  }

  async deleteReward(): Promise<null> {
    await this.prisma.reward.deleteMany();
    return null;
  }

  //     async createReward(): Promise<Reward> {
  //     const score = await this.scoreService.getTotalScore();

  //     const existingReward = await this.getReward();
  //   }
}
