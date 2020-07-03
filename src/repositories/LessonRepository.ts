import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import Lesson from '../models/Lesson';

@EntityRepository(Lesson)
export default class LessonRepository extends Repository<Lesson> {
  public async createLesson(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const repo = getRepository(Lesson);
    const {
      description, classe
    } = request.body;
    const lesson = repo.create({
      description, classe
    });
    const err = await validate(lesson);

    if (!err.length) {
      return response.status(201).json(
        await repo.save(lesson)
      );
    }
    return response.status(400).json(err);
  }

  public async updateLesson(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Lesson);
    const toUpdate = await repo.findOne(id);

    if (!toUpdate) {
      return response.status(404).json({
        message: 'Lesson not found!'
      });
    }
    const {
      description, classe
    } = request.body;
    if (description && classe) {
      toUpdate.description = description;
      toUpdate.classe = classe;
    }

    const lessonUpdate = await repo.save(toUpdate)

    return response.status(201).json(lessonUpdate);
  }

  public async deleteLesson(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Lesson);
    const toDelete = await repo.findOne(id);
    if (!toDelete) {
      return response.status(404).json({
        message: `${id} não encontrado`
      });
    }
    await repo.delete(toDelete);
    return response.status(201).json({
      message: `${id} sucess`
    })
  }

}
