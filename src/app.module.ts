import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScoreModule } from './score/score.module';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [ScoreModule, RewardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
