// pets.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../auth/guards/user-role.guard';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetsService } from './pets.service';

import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { ValidRoles } from '../auth/interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdatePetDto } from './dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Auth(ValidRoles.admin) // Define el rol necesario para acceder a esta ruta
  createPet(@Body() createPetDto: CreatePetDto, @GetUser() user: User) {
    return this.petsService.createPet(createPetDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    // console.log(paginationDto)
    return this.petsService.findAll(paginationDto);
  }
  

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.petsService.findOnePlain(term);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Auth(ValidRoles.admin)
  updatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetDto: UpdatePetDto,
    @GetUser() user: User,
  ) {
    return this.petsService.updatePet(id, updatePetDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Auth(ValidRoles.admin)
  removePet(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.removePet( id );

  }
}

/*
 */
