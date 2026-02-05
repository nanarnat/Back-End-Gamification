import { Injectable } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ScoreService } from '../score/score.service';

@Injectable()
export class RewardService {
  private readonly rewardRules = [
    { type: 'A', requiredScore: 5000 },
    { type: 'B', requiredScore: 7500 },
    { type: 'C', requiredScore: 10000 },
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

  async createReward() {
    const score = await this.scoreService.getTotalScore();

    const existingRewards = await this.getReward();
    const existingTypes = new Set(existingRewards.map((r) => r.reward));

    const rewardData = this.rewardRules
      .filter((e) => score >= e.requiredScore && !existingTypes.has(e.type))
      .map((e) => ({ reward: e.type }));

    if (rewardData.length === 0) return [];

    await this.prisma.reward.createMany({
      data: rewardData,
    });

    return rewardData;
  }
}
