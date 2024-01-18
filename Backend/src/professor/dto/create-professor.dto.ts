// create-professor.dto.ts

import { IsString, IsNotEmpty, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { RatingCommentDto } from './rating-comment.dto';

export class CreateProfessorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsArray()
  readonly features?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  readonly ratingsComments?: RatingCommentDto[];
}
