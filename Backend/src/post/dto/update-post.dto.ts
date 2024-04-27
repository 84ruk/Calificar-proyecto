import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsString()
  authorId: string; // Asumiendo que solo necesitas el ID del autor para crear el post
}
