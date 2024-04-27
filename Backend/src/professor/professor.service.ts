// profes.service.ts

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessorDto } from './dto';
import { RatingCommentDto } from './dto';
import { Professor } from './entities/professor.entity';
import { Comment, ProfessorCharacteristic } from './entities/comment.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { classToPlain } from 'class-transformer';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createProfessor(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    const professor = this.professorRepository.create(createProfessorDto);
    return await this.professorRepository.save(professor);
  }
  
  async getProfessorById(term: string): Promise<Professor> {
    const professor = await this.professorRepository.findOne({
      where: { id: term },
      relations: ['comments'], // Cargar la relación 'comments'
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
  
  async addRatingComment(professorId: string, ratingCommentDto: RatingCommentDto): Promise<{ averageRating: number; characteristics: ProfessorCharacteristic[] }> {
    try {
        if (!ratingCommentDto.professorCharacteristics || ratingCommentDto.professorCharacteristics.length === 0) {
            throw new BadRequestException('Professor characteristics array must not be empty');
        }

        const professor = await this.getProfessorById(professorId);

        const validCharacteristics = ratingCommentDto.professorCharacteristics.filter(characteristic =>
            ProfessorCharacteristic[characteristic] !== undefined
        );

        if (validCharacteristics.length === 0) {
            throw new BadRequestException('No valid professor characteristics provided');
        }

        const mappedCharacteristics = validCharacteristics.map(characteristic => ProfessorCharacteristic[characteristic]);


        const comment = new Comment();
        comment.comment = ratingCommentDto.comment;
        comment.rating = ratingCommentDto.rating;
        comment.professorCharacteristics = mappedCharacteristics;

        const savedComment = await this.commentRepository.save(comment);

        professor.comments.push(savedComment);

        // Recalcula el averageRating
        this.recalculateAverageRating(professor);

        // Guarda la entidad Professor
        const savedProfessor = await this.professorRepository.save(professor);

        // Devuelve la información necesaria
        return {
            averageRating: savedProfessor.averageRating,
            characteristics: mappedCharacteristics
        };
    } catch (error) {
        console.error('Error en addCommentToProfessor:', error);
        throw new InternalServerErrorException('Error creating comment for professor');
    }
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

  async likeProfessor(professorId: string) {
    const professor = await this.professorRepository.findOne({ where: { id: professorId } });
    if (!professor) {
        throw new Error(`Professor with id ${professorId} not found`);
    }
    professor.likes++;
    return this.professorRepository.save(professor);
}

async dislikeProfessor(professorId: string) {
    const professor = await this.professorRepository.findOne({ where: { id: professorId } });
    if (!professor) {
        throw new Error(`Professor with id ${professorId} not found`);
    }
    professor.dislikes++;
    return this.professorRepository.save(professor);
}

async getProfessorStats(professorId: string) {
    const professor = await this.professorRepository.findOne({ where: { id: professorId } });
    if (!professor) {
        throw new Error(`Professor with id ${professorId} not found`);
    }
    return {
        likes: professor.likes,
        dislikes: professor.dislikes,
        comments: professor.comments.length,
    };
}
}