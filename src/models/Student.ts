import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { IsEmail, Max, Min, MaxLength, MinLength } from 'class-validator';
import Class from './Class';
import Identifier from './Identifier';

@Entity('student')
export default class Student {
  @Column(type => Identifier)
  identification: Identifier;

  @Column()
  @Max(99999, { message: 'Chave inválida' })
  @Min(10000)
  key: number;

  @Column()
  @IsEmail()
  email: string;

  @ManyToMany(type => Class)
  @JoinTable()
  classes: Class;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;
}
