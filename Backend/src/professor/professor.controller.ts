// profes.controller.ts

import { Controller, Post, Body, Param, Delete, Put, Get } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto';
import { RatingCommentDto } from './dto';
import { Professor } from './entities/professor.entity';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  createProfessor(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.createProfessor(createProfessorDto);
  }

  @Get(':id')
  async getProfessor(@Param('id') professorId: string): Promise<Professor> {
    return await this.professorService.getProfessorById(professorId);
  }


  @Put(':id')
  updateProfessor(@Param('id') professorId: string, @Body() updateProfessorDto: CreateProfessorDto) {
    return this.professorService.updateProfessor(professorId, updateProfessorDto);
  }

  @Delete(':id')
  deleteProfessor(@Param('id') professorId: string) {
    return this.professorService.deleteProfessor(professorId);
  }

  @Post(':id/ratings-comments')
  addRatingComment(@Param('id') professorId: string, @Body() ratingCommentDto: RatingCommentDto) {
    return this.professorService.addRatingComment(professorId, ratingCommentDto);
  }
}
