// profes.controller.ts

import { Controller, Post, Body, Param, Delete, Put, Get, Query, NotFoundException } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto';
import { RatingCommentDto } from './dto';
import { Professor } from './entities/professor.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { classToPlain } from 'class-transformer';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  createProfessor(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.createProfessor(createProfessorDto);
  }

  @Get(':id')
  async getProfessor(@Param('id') professorId: string): Promise<any> {
    try {
      const professor = await this.professorService.getProfessorById(professorId);
      // Utiliza classToPlain para evitar el bucle circular
      return classToPlain(professor);
    } catch (error) {
      throw new NotFoundException(`Professor with ID ${professorId} not found`);
    }
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    // console.log(paginationDto)
    return this.professorService.findAll(paginationDto);
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
