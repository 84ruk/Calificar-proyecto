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
    
    return {
      posts: posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        author: {
          id: post.author.id,
          name: post.author.fullName, // Cambiar fullName por el nombre real del campo
        },
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

    // Transformar el objeto antes de devolverlo
    const transformedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      author: post.author.fullName, // Solo incluye el fullName del autor
      comments: post.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        author: {
          fullName: comment.author.fullName,
        },
      })),
    };

    return transformedPost;
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
    // Buscar el post en la base de datos
    const post = await this.postRepository.findOne({ where: { id: postId } });

    // Verificar si el post existe
    if (!post) {
      throw new NotFoundException('El post no fue encontrado.');
    }

    // Verificar si el usuario tiene permiso para actualizar el post
    if (post.author.id !== user.id) {
      throw new UnauthorizedException('No tienes permiso para actualizar este post.');
    }

    // Aplicar las actualizaciones proporcionadas
    Object.assign(post, updatePostDto);

    // Guardar el post actualizado en la base de datos
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

    // Guardar el comentario utilizando el repositorio de comentarios
    const savedComment = await this.commentPostRepository.save(comment);

    return savedComment;
  }

 
  
}
