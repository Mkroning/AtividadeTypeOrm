import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';

export default class Identifier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @MaxLength(50, { message: 'Nome precisar no máximo 50 caracteres' })
  @MinLength(2, { message: 'Nome deve possuir no mínimo 1 caractere' })
  name: string;

  @Column()
  cnpj: string;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;
}
