import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score } from '@prisma/client';
import { CreateScoreDTO } from './create.score.dto';

@Controller('score') // ดูแล/score
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('')
  async getScore(): Promise<Score[]> {
    return this.scoreService.getScore();
  }

  @Get('totalScore')
  async getTotalScore(): Promise<number> {
    return this.scoreService.getTotalScore();
  }

  @Post('')
  async createScore(@Body() dto: CreateScoreDTO): Promise<Score> {
    return this.scoreService.createScore(dto);
  }

  @Delete('')
  async deleteAllScore(): Promise<null> {
    return this.scoreService.deleteAllScore();
  }
}
