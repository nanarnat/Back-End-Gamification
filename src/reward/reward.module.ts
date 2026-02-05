import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { ScoreModule } from 'src/score/score.module';

@Module({
  imports: [ScoreModule],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
