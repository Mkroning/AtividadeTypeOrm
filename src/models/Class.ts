import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { MaxLength, MinLength } from 'class-validator';
import Lesson from './Lesson';

@Entity('class')
export default class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
    unique: true,
  })
  @MaxLength(50, {
    message: 'Name tem que conter no maximo 50 caracteres',
  })
  name: string;

  @OneToMany(type => Lesson, classe => Class)
  lessons: Lesson[];

  @Column()
  @MaxLength(60, {
    message: 'Duration é no maximo de 60 horas',
  })
  @MinLength(20, {
    message: 'Duration é no minimo  20 horas',
  })
  duration: number;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;
}
