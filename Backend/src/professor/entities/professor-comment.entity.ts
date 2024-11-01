import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Professor } from './professor.entity';
import { Comment } from './comment.entity';

@Entity('professor_comments')
export class ProfessorComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Professor, (professor) => professor.professorComments, { nullable: false })
  professor: Professor;

  @ManyToOne(() => Comment, (comment) => comment.professorComments, { nullable: false })
  comment: Comment;
}
