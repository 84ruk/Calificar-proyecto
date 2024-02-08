// professor-comment.entity.ts
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Professor } from './professor.entity';
import { Comment } from './comment.entity';

@Entity()
export class ProfessorComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Professor, professor => professor.professorComments)
  professor: Professor;

  @ManyToOne(() => Comment, comment => comment.professorComments)
  comment: Comment;
}
