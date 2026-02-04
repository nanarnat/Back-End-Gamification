import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Score } from '@prisma/client';

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  async getScore(): Promise<Score[]> {
    return this.prisma.score.findMany();
  }

  async getTotalScore(): Promise<number> {
    const totalScore = await this.prisma.score.aggregate({
      _sum: {
        score: true,
      },
    });

    const score = Math.min(Math.max(totalScore._sum.score ?? 0, 0), 100);
    return score;
  }
}
