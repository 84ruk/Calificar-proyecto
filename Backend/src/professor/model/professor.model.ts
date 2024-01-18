// professor.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Comment } from '../entities/comment.entity';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastName: string;

  // Otros campos relevantes para el profesor

  @ManyToMany(() => User, (user) => user.professorsRated)
  usersRated: User[];

  @OneToMany(() => Comment, (comment) => comment.professor)
  comments: Comment[];
}
