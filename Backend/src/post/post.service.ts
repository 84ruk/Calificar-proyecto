// src/post/post.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto, CreatePostDto, UpdatePostDto } from './dto';
import { User } from 'src/auth/entities/user.entity';
import { CommentPost } from './entities/comment-post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(CommentPost)
    private readonly commentPostRepository: Repository<CommentPost>, 

  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
  
    const [posts, total] = await this.postRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['author'],
    });
  
    const totalPages = Math.ceil(total / limit);
  
    const postIds = posts.map(post => post.id);
    const commentCounts = await this.commentPostRepository
      .createQueryBuilder('comment')
      .select('comment.postId', 'postId')
      .addSelect('COUNT(comment.id)', 'count')
      .where('comment.postId IN (:...postIds)', { postIds })
      .groupBy('comment.postId')
      .getRawMany();
  
    const commentCountMap = commentCounts.reduce((acc, { postId, count }) => {
      acc[postId] = count;
      return acc;
    }, {});
  
    return {
      posts: posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        author: {
          id: post.author.id,
          name: post.author.fullName, 
        },
        commentCount: commentCountMap[post.id] || 0,
        likeCount: post.likeCount,
      })),
      total,
      currentPage: page,
      totalPages,
    };
  }
  
  async getPostById(postId: string): Promise<any> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.author', 'commentAuthor')
      .leftJoinAndSelect('post.author', 'author')
      .where('post.id = :postId', { postId })
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.createdAt',
        'post.likeCount',
        'author.fullName',
        'comments.id',
        'comments.content',
        'comments.createdAt',
        'commentAuthor.fullName',
      ])
      .getOne();
  
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
  
    // Obtener el conteo de comentarios
    const commentCount = await this.commentPostRepository.count({ where: { post: { id: postId } } });
  
    // Transformar el objeto antes de devolverlo
    const transformedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      author: post.author.fullName, 
      comments: post.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        author: {
          fullName: comment.author.fullName,
        },
      })),
      commentCount, 
      likeCount: post.likeCount,
    };
  
    return transformedPost;
  }
  
  async incrementLikes(postId: string): Promise<void> {
    await this.postRepository.increment({ id: postId }, 'likeCount', 1);
  }


async createPost( createPostDto: CreatePostDto, user: User) {

    const post = this.postRepository.create({
      ...createPostDto,
      createdAt: new Date(),
      author: user,
      comments: []
    });
    return this.postRepository.save(post);

  }

  async updatePost(postId: string, updatePostDto: UpdatePostDto, user: User): Promise<string> {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('El post no fue encontrado.');
    }

    if (post.author.id !== user.id) {
      throw new UnauthorizedException('No tienes permiso para actualizar este post.');
    }

    Object.assign(post, updatePostDto);

    await this.postRepository.save(post);

    return 'El post ha sido actualizado correctamente.';
  }

  async deletePostById(postId: string): Promise<void> {
    try {
      const postToDelete = await this.postRepository.findOne({ where: { id: postId } });
      if (!postToDelete) {
        throw new Error('Post not found');
      }
      await this.postRepository.delete(postId);
    } catch (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }


  async createComment(postId: string, createCommentDto: CreateCommentDto, user: User): Promise<CommentPost> {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('El post no fue encontrado.');
    }

    const comment = new CommentPost();
    comment.content = createCommentDto.content;
    comment.createdAt = new Date();
    comment.author = user;
    comment.post = post;

    const savedComment = await this.commentPostRepository.save(comment);

    return savedComment;
  }

 
  
}
