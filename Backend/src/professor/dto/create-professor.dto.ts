// create-professor.dto.ts

import { IsString, IsNotEmpty, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { RatingCommentDto } from './rating-comment.dto';
import { Exclude } from 'class-transformer';

export class CreateProfessorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsArray()
  readonly professorCharacteristic?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Exclude()
  readonly ratingsComments?: RatingCommentDto[];
}
