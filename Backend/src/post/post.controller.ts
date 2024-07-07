// src/post/post.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, ValidationPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { CreateCommentDto, CreatePostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Post as PostEntity } from './entities/post.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postService.findAll(paginationDto);
  }

  @Get(':id')
  async getPostById(@Param('id') postId: string): Promise<PostEntity> {
    return await this.postService.getPostById(postId);
  }

  @Post()
  @Auth( ValidRoles.superUser )
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ) {


    // Llama al servicio para crear el post
    return await this.postService.createPost(createPostDto, user);
  }
  

  @Patch(':id')
  @Auth( ValidRoles.superUser )
    async updatePost(
      @Param('id') postId: string,
      @Body() updatePostDto: UpdatePostDto,
      @GetUser() user: User,
    ): Promise<string> {

      return this.postService.updatePost(postId, updatePostDto, user);
  }

  @Delete(':id')
  async deletePostById(@Param('id') postId: string): Promise<void> {
    await this.postService.deletePostById(postId);
  }

  @Post(':postId/comments')
  @Auth()
  async createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ) {
    return this.postService.createComment(postId, createCommentDto, req.user);
  }

  @Patch(':id/like')
  async likePost(@Param('id') id: string) {
    await this.postService.incrementLikes(id);
  }

}