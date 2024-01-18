// profes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessorDto } from './dto';
import { RatingCommentDto } from './dto';
import { Professor } from './entities/professor.entity';

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
    
    const comment = {
      comment: ratingCommentDto.comment,
      rating: ratingCommentDto.rating,
      professor: professor,
    };

    professor.comments.push(comment);

    // Recalcula la calificación promedio
    professor.averageRating = this.calculateAverageRating(professor);

    return await this.professorRepository.save(professor);
  }

  private calculateAverageRating(professor: Professor): number {
    const totalRating = professor.comments.reduce((sum, comment) => sum + comment.rating, 0);
    return totalRating / professor.comments.length;
  }
}