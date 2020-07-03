import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Class from '../models/Class';

@EntityRepository(Class)
export default class ClassRepository extends Repository<Class> {
  public async findByName(name: string): Promise<Class[]> {
    return this.find({
      where: {
        name,
      },
    });
  }

  public async updateClass(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Class);
    const toUpdate = await repo.findOne(id);
    if (!toUpdate) {
      return response.status(404).json({
        message: `${id} not found!`,
      });
    }
    const { name, duration, lessons } = request.body;
    if (name && duration && lessons) {
      toUpdate.name = name;
      toUpdate.duration = parseInt(duration, 10);
      toUpdate.lessons = lessons;
    }

    const lessonUpdate = await repo.save(toUpdate);
    return response.status(201).json(lessonUpdate);
  }

  public async deleteClass(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Class);
    const toDelete = await repo.findOne(id);
    if (!toDelete) {
      return response.status(404).json({
        message: `${id} not found!`,
      });
    }
    await repo.delete(toDelete);
    return response.status(201).json({
      message: `${id} deleted with sucess`,
    });
  }
}
