// professor.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @ManyToMany(() => User, (user) => user.professorsRated)
  @JoinTable()
  usersRated: User[];

  @OneToMany(() => Comment, (comment) => comment.professor)
  comments: Comment[];
}
