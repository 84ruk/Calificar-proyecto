import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Comment } from './comment.entity';
import { ProfessorComment } from './professor-comment.entity';

@Entity('professor')
export class Professor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @Column({ default: 0 })  // Agrega este campo
  commentsCount: number;  // Almacena el conteo de comentarios

  @ManyToMany(() => User, (user) => user.professorsRated)
  @JoinTable()
  usersRated: User[];

  @OneToMany(() => Comment, (comment) => comment.professor, { cascade: true })
  comments: Comment[];

  @OneToMany(() => ProfessorComment, (pc) => pc.professor)
  professorComments: ProfessorComment[];

  // Métodos para incrementar y decrementar
  incrementCommentsCount() {
    this.commentsCount++;
  }

  decrementCommentsCount() {
    this.commentsCount--;
  }
}
