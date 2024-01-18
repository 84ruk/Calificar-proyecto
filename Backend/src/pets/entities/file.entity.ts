import { Pet } from './';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'pet_images' })
export class PetImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(
        () => Pet,
        ( pet ) => pet.images,
        {  onDelete: 'CASCADE' }
    )
    pet: Pet

}