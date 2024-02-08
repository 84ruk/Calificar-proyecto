// comment.entity.ts

import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Professor } from './professor.entity';
import { ProfessorComment } from './professor-comment.entity';


export enum ProfessorCharacteristic {
  RESPETUOSO = 'Respetuoso',
  MUCHATAREA = 'Mucha Tarea',
  ENOJON = 'Enojon',
  MUCHOTRABAJO = 'Mucho Trabajo',

}

@Entity()
export class Comment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  comment: string;

  @Column({ type: 'float' })
  rating: number;

  @Column({ type: 'enum', enum: ProfessorCharacteristic, array: true }) // Cambia aquí
  professorCharacteristics: string[]; // Cambia aquí

  @ManyToOne(() => Professor, (professor) => professor.comments, { onDelete: 'CASCADE' })
  professor: Professor;
  
  @OneToMany(() => ProfessorComment, pc => pc.comment)
  professorComments: ProfessorComment[];
}
