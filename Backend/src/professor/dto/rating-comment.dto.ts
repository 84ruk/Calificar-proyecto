// rating-comment.dto.ts

import { IsString, IsNotEmpty, IsNumber, Min, Max, ValidateNested, IsOptional } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

export class RatingCommentDto {
  @ValidateNested()
  readonly user: User;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly comment: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;
}


