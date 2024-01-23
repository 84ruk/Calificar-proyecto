// comment.entity.ts

import { Entity, Column, ManyToOne } from 'typeorm';
import { Professor } from './professor.entity';

@Entity()
export class Comment {

  @Column({ length: 500 })
  comment: string;

  @Column({ type: 'float' })
  rating: number;

  @ManyToOne(() => Professor, (professor) => professor.comments, { onDelete: 'CASCADE' })
  professor: Professor;
  
}
