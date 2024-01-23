import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ProfessorService } from './professor.service';
import { ProfessorsController } from './professor.controller';
import { Professor } from './entities/professor.entity';
import { Comment } from './entities/comment.entity';



@Module({
  controllers: [ProfessorsController],
  providers: [ProfessorService],
  imports: [
    TypeOrmModule.forFeature([ Professor, Comment  ]),
    AuthModule,
  ],
  exports: [
    ProfessorService,
    TypeOrmModule,
  ]
})
export class ProfessorModule {}
