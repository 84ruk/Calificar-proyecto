// pets/dto/create-pet.dto.ts

import { IsString, IsInt, IsNotEmpty, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsInt()
  energyLevel: number;

  @IsInt()
  affectionLevel: number;

  @IsString()
  @IsNotEmpty()
  breedSize: string;

  @IsString()
  @IsNotEmpty()
  personalityTraits: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isAvailable: boolean;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
