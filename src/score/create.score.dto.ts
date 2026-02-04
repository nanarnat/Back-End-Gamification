import { IsEnum } from 'class-validator';

export enum ScoreValue {
  S300 = 300,
  S500 = 500,
  S1000 = 1000,
  S3000 = 3000,
}

export class CreateScoreDTO {
  @IsEnum(ScoreValue)
  score: ScoreValue;
}
