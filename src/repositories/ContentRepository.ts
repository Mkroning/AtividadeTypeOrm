import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import Content from '../models/Content';

@EntityRepository(Content)
export default class ContentRepository extends Repository<Content> {
  public async createContent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const repository = getRepository(Content);
    const { description, linkContent, lesson } = request.body;
    const content = repository.create({
      description,
      linkContent,
      lesson,
    });
    const err = await validate(content);

    if (!err.length) {
      return response.status(201).json(await repository.save(content));
    }

    return response.status(400).json(err);
  }

  public async updateContent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Content);
    const toUpdate = await repo.findOne(id);

    if (!toUpdate) {
      return response.status(400).json({
        message: 'Content not found',
      });
    }

    const { description, linkContent, lesson } = request.body;

    if (description && linkContent && lesson) {
      toUpdate.description = description;
      toUpdate.linkContent = linkContent;
      toUpdate.lesson = lesson;
    }

    const res = await repo.save(toUpdate);

    return response.status(201).json(res);
  }

  public async deleteContent(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    const { id } = request.params;
    const repo = getRepository(Content);
    const toDelete = await repo.findOne(id);

    if (!toDelete) {
      return response.status(400).json({
        message: 'Not found',
      });
    }
    await repo.delete(toDelete);
    return response.status(201).json({
      message: `${id} removido com sucesso!`,
    });
  }
}
