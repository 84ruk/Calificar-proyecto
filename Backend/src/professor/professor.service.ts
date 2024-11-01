// profes.service.ts

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, EntityManager } from 'typeorm';
import { CreateProfessorDto, RatingCommentDto } from './dto';
import { Professor } from './entities/professor.entity';
import { Comment, ProfessorCharacteristic } from './entities/comment.entity'; // pasar a enum
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly connection: Connection,
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

  async recalculateAverageRating(professor: Professor, entityManager: EntityManager) {
    const ratings = professor.comments.map(comment => comment.rating);
    const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
    professor.averageRating = averageRating;

    console.log('Updating professor with average rating:', averageRating);
    await entityManager.save(Professor, professor);
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
 
  async addRatingComment(
    professorId: string,
    ratingCommentDto: RatingCommentDto,
  ): Promise<{ averageRating: number; characteristics: ProfessorCharacteristic[] }> {
    try {

      if (!ratingCommentDto.professorCharacteristics || ratingCommentDto.professorCharacteristics.length === 0) {
        throw new BadRequestException('Professor characteristics array must not be empty');
      }
  
      const professor = await this.getProfessorById(professorId);
  
      // Asegúrate de que validCharacteristics sea de tipo ProfessorCharacteristic[]
      const validCharacteristics: ProfessorCharacteristic[] = ratingCommentDto.professorCharacteristics.filter(characteristic =>
        Object.values(ProfessorCharacteristic).includes(characteristic as ProfessorCharacteristic)
      ) as ProfessorCharacteristic[];
  
      if (validCharacteristics.length === 0) {
        throw new BadRequestException('No valid professor characteristics provided');
      }
  
      // Limpieza de características, asegurando que no haya valores no válidos
      const cleanedCharacteristics: ProfessorCharacteristic[] = validCharacteristics.filter(characteristic => 
        characteristic !== null && 
        characteristic !== undefined &&
        Object.values(ProfessorCharacteristic).includes(characteristic)
      );
  
      if (cleanedCharacteristics.length === 0) {
        throw new BadRequestException('Characteristics cannot be empty');
      }
  
      await this.connection.transaction(async (entityManager) => {
        const comment = new Comment();
        comment.comment = ratingCommentDto.comment;
        comment.rating = ratingCommentDto.rating;
        comment.professorCharacteristics = cleanedCharacteristics;
        comment.professor = professor;
  
        const savedComment = await entityManager.save(Comment, comment);
        professor.comments.push(savedComment);
        await this.recalculateAverageRating(professor, entityManager);
      });
  
      return {
        averageRating: professor.averageRating,
        characteristics: cleanedCharacteristics,
      };
    } catch (error) {
      console.error('Error en addRatingComment:', error);
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
      throw new NotFoundException(`Professor with id ${professorId} not found`);
    }
    professor.likes++;
    return this.professorRepository.save(professor);
  }

  async dislikeProfessor(professorId: string) {
    const professor = await this.professorRepository.findOne({ where: { id: professorId } });
    if (!professor) {
      throw new NotFoundException(`Professor with id ${professorId} not found`);
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
