// profes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessorDto } from './dto';
import { RatingCommentDto } from './dto';
import { Professor } from './entities/professor.entity';
import { Comment } from './entities/comment.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  async createProfessor(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    const professor = this.professorRepository.create(createProfessorDto);
    return await this.professorRepository.save(professor);
  }
  
  async getProfessorById(term: string): Promise<Professor> {
    const professor = await this.professorRepository.findOne({
      where: { id: term },
      relations: ['comments'],
    });
    
    if (!professor) {
      throw new NotFoundException(`Professor with ID ${term} not found`);
    }
    return professor;
  }

  async recalculateAverageRating(professor: Professor): Promise<Professor> {
    const comments = professor.comments;

    if (comments.length === 0) {
      // Si no hay comentarios, el promedio es 0
      professor.averageRating = 0;
    } else {
      // Calcula el promedio de las calificaciones de los comentarios
      const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
      professor.averageRating = totalRating / comments.length;
    }

    return await this.professorRepository.save(professor);
  }
  
  async updateProfessor(professorId: string, updateProfessorDto: CreateProfessorDto): Promise<Professor> {
    const professor = await this.getProfessorById(professorId);
    this.professorRepository.merge(professor, updateProfessorDto);
    return await this.professorRepository.save(professor);
  }

  async deleteProfessor(professorId: string): Promise<void> {
    const professor = await this.getProfessorById(professorId);
    await this.professorRepository.remove(professor);
  }

  async addRatingComment(professorId: string, ratingCommentDto: RatingCommentDto): Promise<Professor> {
    const professor = await this.getProfessorById(professorId);
    
    const comment = new Comment();
    comment.comment = ratingCommentDto.comment;
    comment.rating = ratingCommentDto.rating;
    comment.professor = professor;
  
    professor.comments.push(comment);
  
    // Recalcula la calificación promedio
  
    await this.recalculateAverageRating(professor);

    return await this.professorRepository.save(professor);
  }
  

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
  
    const [profes, total] = await this.professorRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    
    const totalPages = Math.ceil(total / limit);
    
    return {
      profes,
      total,
      currentPage: page,
      totalPages,
    };
    
  }

}