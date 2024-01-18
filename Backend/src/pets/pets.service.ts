// pets.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreatePetDto, UpdatePetDto } from './dto';
/* import { PaginationDto } from 'src/common/dtos/pagination.dto';
 */

import { validate as isUUID } from 'uuid';
import { Pet } from './entities/pet.entity';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PetImage } from './entities';

@Injectable()
export class PetsService {
  private readonly logger = new Logger('PetsService');

  constructor(

    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,

    @InjectRepository(PetImage)
    private readonly petImageRepository: Repository<PetImage>,

    private readonly dataSource: DataSource,
  ) {}

  async createPet(createPetDto: CreatePetDto, user: User) {

    try {
      const { images = [], ...petDetails } = createPetDto;

      const pet = this.petRepository.create({
        ...petDetails,
        images: images.map( image => this.petImageRepository.create({ url: image }) ),
        rescuer: user, // Asignar el usuario al Pet
      });

      // Guardar la nueva instancia de Pet en la base de datos
      await this.petRepository.save(pet);

      // Excluir el campo rescuer antes de devolver el objeto Pet
      const { rescuer, ...petWithoutRescuer } = pet;

      return { petWithoutRescuer, images };
    } catch (error) {
      // Manejar errores de base de datos
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
  
    const [pets, total] = await this.petRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    
    const totalPages = Math.ceil(total / limit);
    
    return {
      pets,
      total,
      currentPage: page,
      totalPages,
    };
    
  }
  

  async findOne(term: string) {
    let pet: Pet;

    if (isUUID(term)) {
      pet = await this.petRepository.findOne({
        where: { id: term },
        relations: ['rescuer'],
      });
    } else {
      const queryBuilder = this.petRepository.createQueryBuilder('pet');
      pet = await queryBuilder
        .leftJoinAndSelect('pet.rescuer', 'rescuer') // Incluir la información del rescatista
        .where('UPPER(name) = :name', {
          name: term.toUpperCase(),
        })
        .getOne();
    }

    if (!pet) {
      throw new NotFoundException(`Pet with ${term} not found`);
    }

    return pet;
  }

  async findOnePlain(term: string) {
    const pet = await this.findOne(term);
    return {
      pet,
    };
  }

  async updatePet(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log(id)
      const pet = await this.petRepository.findOne({ where: { id } });

      if (!pet) {
        throw new NotFoundException(`Pet with id ${id} not found`);
      }

      // Actualizar propiedades del pet con los datos de updatePetDto
      Object.assign(pet, updatePetDto);

      // Guardar el pet actualizado
      const updatedPet = await this.petRepository.save(pet);

      // Commitear la transacción y liberar el query runner
      await queryRunner.commitTransaction();
      await queryRunner.release();

      // Retornar el pet actualizado
      return updatedPet;
    } catch (error) {
      // Manejar errores de base de datos
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const pet = await this.findOne(id);
    await this.petRepository.remove(pet);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async removePet(id: string) {
    const query = this.petRepository.createQueryBuilder('pet');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
