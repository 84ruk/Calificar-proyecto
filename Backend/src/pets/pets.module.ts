import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';

import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

import { Pet, PetImage } from './entities';

@Module({
  controllers: [PetsController],
  providers: [PetsService],
  imports: [
    TypeOrmModule.forFeature([ Pet, PetImage  ]),
    AuthModule,
  ],
  exports: [
    PetsService,
    TypeOrmModule,
  ]
})
export class PetsModule {}
