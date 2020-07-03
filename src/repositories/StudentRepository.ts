import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import Student from '../models/Student';

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student> {
  public async createStudent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const repo = getRepository(Student);
    const {
      key, name, email
    } = request.body;
    const newStudent = repo.create({
      key, name, email
    });
    const err = await validate(newStudent);

    if (!err.length) {
      return response.status(201).json(await repo.save(newStudent));
    }

    return response.status(400).json(err);
  }

  public async updateStudent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Student);
    const toUpdate = await repo.findOne(id);

    if (!toUpdate) {
      return response.status(404).json({
        message: `${id} not found`
      });
    }
    const { name, key } = request.body;
    if (name && key){
      toUpdate.name = name;
      toUpdate.key = key;
    }
    const StudentUpdate = await repo.save(toUpdate);
    return response.status(201).json(StudentUpdate);
  }

  public async deleteStudent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Student);
    const toDelete = await repo.findOne(id);

    if(!toDelete){
      return response.status(404).json({
        message: `${id} not found`
      });
    }

    await repo.delete(toDelete);
    return response.status(201).json({
      message: `${id} deleted with success`
    })
  }
}
