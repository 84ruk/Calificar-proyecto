import { IsString, IsNotEmpty, IsDate, MinLength } from 'class-validator';

export class CreatePostDto {
  
  @IsNotEmpty()
  @IsString()
  @MinLength(5, {
    message: 'El titulo es muy corto. Deberia de tener minimo 5 caracteres.',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, {
    message: 'El contenido es muy corto. Deberia de tener minimo 10 caracteres.',
  })
  content: string;

}
