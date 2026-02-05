import { IsEnum } from 'class-validator';

export enum RewardType {
  typeA = 'typeA',
  typeB = 'typeB',
  typeC = 'typeC',
}

export class CreateRewardDTO {
  @IsEnum(RewardType)
  score: RewardType;
}
