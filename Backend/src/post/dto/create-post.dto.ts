import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
  // Agrega más validaciones si lo necesitas
}
