// src/post/post.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, UpdatePostDto } from './dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
  
    const [profes, total] = await this.postRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    
    const totalPages = Math.ceil(total / limit);
    
    return {
      profes,
      total,
      currentPage: page,
      totalPages,
    };
  }

  async getPostById(postId: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    return post;
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
}
