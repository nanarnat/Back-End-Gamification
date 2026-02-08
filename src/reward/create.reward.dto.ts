import { IsEnum } from 'class-validator';

export enum RewardValue {
  A = 'A',
  B = 'B',
  C = 'C',
}

export class CreateRewardDTO {
  @IsEnum(RewardValue)
  reward: RewardValue;
}
