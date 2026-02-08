import { BadRequestException, Injectable } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ScoreService } from '../score/score.service';
import { CreateRewardDTO, RewardValue } from './create.reward.dto';

@Injectable()
export class RewardService {
  private readonly rewardRules = [
    { type: RewardValue.A, requiredScore: 5000 },
    { type: RewardValue.B, requiredScore: 7500 },
    { type: RewardValue.C, requiredScore: 10000 },
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

  async createReward(dto: CreateRewardDTO) {
    const score = await this.scoreService.getTotalScore();

    const rule = this.rewardRules.find((r) => r.type === dto.reward);
    if (!rule) throw new BadRequestException('Invalid reward type');

    if (score < rule.requiredScore) {
      throw new BadRequestException('Not enough score');
    }

    const existingReward = await this.prisma.reward.findFirst({
      where: { reward: dto.reward },
    });

    if (existingReward) {
      throw new BadRequestException('Already claim this reward');
    }

    const rewardData = await this.prisma.reward.createMany({
      data: { reward: dto.reward },
    });

    return rewardData;
  }
}
