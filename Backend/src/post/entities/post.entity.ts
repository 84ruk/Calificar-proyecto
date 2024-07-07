import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { CommentPost } from './comment-post.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.posts)
  author: User;

  @OneToMany(() => CommentPost, comment => comment.post)
  comments: CommentPost[];

  @Column({ default: 0 })
  likeCount: number; // Agregar el campo likeCount
}
