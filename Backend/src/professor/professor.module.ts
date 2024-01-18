import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ProfessorService } from './professor.service';
import { ProfessorsController } from './professor.controller';
import { Professor } from './model/professor.model';



@Module({
  controllers: [ProfessorsController],
  providers: [ProfessorService],
  imports: [
    TypeOrmModule.forFeature([ Professor  ]),
    AuthModule,
  ],
  exports: [
    ProfessorService,
    TypeOrmModule,
  ]
})
export class PetsModule {}
