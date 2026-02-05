import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Score } from '@prisma/client';
import { CreateScoreDTO } from './create.score.dto';

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

    const score = Math.min(Math.max(totalScore._sum.score ?? 0, 0), 10000);
    return score;
  }

  async createScore(dto: CreateScoreDTO): Promise<Score> {
    return this.prisma.score.create({
      data: { score: dto.score },
    });
  }

  async deleteAllScore(): Promise<null> {
    await this.prisma.score.deleteMany();
    return null;
  }
}
