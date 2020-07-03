import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { MaxLength } from 'class-validator';
import Content from './Content';
import Class from './Class';

@Entity('lesson')
export default class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 150,
  })
  @MaxLength(150, {
    message: 'Description é no máximo de 150 caracteres',
  })
  description: string;

  @OneToOne(type => Content, lesson => Lesson)
  content: Content;

  @ManyToOne(type => Class, lessons => Lesson, { eager: true })
  classe: Class;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;
}
