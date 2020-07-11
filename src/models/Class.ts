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
import Identifier from './Identifier';

@Entity('class')
export default class Class {
  @Column(type => Identifier)
  identification: Identifier;

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
