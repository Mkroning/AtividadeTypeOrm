import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import Lesson from './Lesson';

@Entity('content')
export default class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => Lesson, content => Content)
  @JoinColumn()
  lesson: Lesson;

  @Column({
    length: 200,
  })
  @MaxLength(200, {
    message: 'Description é no máximo de 200 caracteres',
  })
  @MinLength(50, {
    message: 'Description tem que ter no mínimo 50 caracteres',
  })
  description: string;

  @Column()
  linkContent: string;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;
}
