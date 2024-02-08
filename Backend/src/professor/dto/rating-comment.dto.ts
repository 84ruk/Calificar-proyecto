import { IsString, IsNotEmpty, IsNumber, Min, Max, IsOptional, IsEnum, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { ProfessorCharacteristic } from '../entities/comment.entity';

export class RatingCommentDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly comment: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @IsNotEmpty()
  @ArrayNotEmpty({ message: 'Professor characteristics array must not be empty' })
  @ArrayUnique({ message: 'Duplicate professor characteristics are not allowed' })
  /* @IsEnum(ProfessorCharacteristic, { each: true }) */
  professorCharacteristics: string[]; // Cambia el tipo a string[]
}
