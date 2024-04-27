// profes.controller.ts

import { Controller, Post, Body, Param, Delete, Put, Get, Query, NotFoundException } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto';
import { RatingCommentDto } from './dto';
import { Professor } from './entities/professor.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { classToPlain } from 'class-transformer';
import { Auth } from 'src/auth/decorators';

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
  @Auth()
  updateProfessor(@Param('id') professorId: string, @Body() updateProfessorDto: CreateProfessorDto) {
    return this.professorService.updateProfessor(professorId, updateProfessorDto);
  }

  @Delete(':id')
  @Auth()
  deleteProfessor(@Param('id') professorId: string) {
    return this.professorService.deleteProfessor(professorId);
  }

  @Post(':id/ratings-comments')
  @Auth()
  addRatingComment(@Param('id') professorId: string, @Body() ratingCommentDto: RatingCommentDto) {
    return this.professorService.addRatingComment(professorId, ratingCommentDto);
  }

  @Post(':id/like')
  @Auth()
  likeProfessor(@Param('id') professorId: string) {
      return this.professorService.likeProfessor(professorId);
  }

  @Post(':id/dislike')
  @Auth()
  dislikeProfessor(@Param('id') professorId: string) {
      return this.professorService.dislikeProfessor(professorId);
  }

  @Get(':id/stats')
  @Auth()
  getProfessorStats(@Param('id') professorId: string) {
      return this.professorService.getProfessorStats(professorId);
  }

}
