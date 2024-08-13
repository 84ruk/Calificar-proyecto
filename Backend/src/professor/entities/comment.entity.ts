import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Professor } from './professor.entity';
import { ProfessorComment } from './professor-comment.entity';
import { User } from 'src/auth/entities/user.entity';

export enum ProfessorCharacteristic {
  RESPETUOSO = 'Respetuoso',
  MUCHATAREA = 'Mucha Tarea',
  MUCHOTRABAJO = 'Mucho Trabajo',
  PUNTUAL = 'Puntual',
  AMABLE = 'Amable',
  ORDINARIO = 'Ordinario',
  EXCELENTE = 'Excelente',
  ENOJON = 'Enojon',
  AMISTOSO = 'Amistoso',
  DIVERTIDO = 'Divertido',
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  comment: string;

  @Column({ type: 'float' })
  rating: number;

  @Column({ type: 'enum', enum: ProfessorCharacteristic, array: true })
  professorCharacteristics: ProfessorCharacteristic[];


  @ManyToOne(() => Professor, (professor) => professor.comments, { onDelete: 'CASCADE' })
  professor: Professor;
  
  @OneToMany(() => ProfessorComment, pc => pc.comment)
  professorComments: ProfessorComment[];



}
