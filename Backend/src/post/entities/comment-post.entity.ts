import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Post } from './post.entity';

@Entity()
export class CommentPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.comments)
  author: User;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}
