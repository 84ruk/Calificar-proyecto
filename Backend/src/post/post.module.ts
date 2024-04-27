import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CommentPost } from './entities/comment-post.entity';



@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([ Post, CommentPost ]),
    AuthModule,
  ],
  exports: [
    PostService,
    TypeOrmModule,
  ]
})
export class PostModule {}
