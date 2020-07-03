import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import Class from '../models/Class';
import ClassRepository from '../repositories/ClassRepository';

const classRouter = Router();

classRouter.post('/', async (request, response) => {
  try {
    const repo = getRepository(Class);
    const res = await repo.save(request.body);
    return response.status(201).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).send();
  }
});

classRouter.get('/', async (request, response) => {
  response.json(await getRepository(Class).find());
});

classRouter.get('/:name', async (request, response) => {
  const repository = getCustomRepository(ClassRepository);
  const res = await repository.findByName(request.params.name);
  response.json(res);
});

classRouter.put('/:id', async (request, response) => {
  try {
    const repo = getCustomRepository(ClassRepository);
    return await repo.updateClass(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

classRouter.delete('/:id', async (request, response) => {
  try {
    const repo = getCustomRepository(ClassRepository);
    return await repo.deleteClass(request, response);
  } catch (err) {
    return response.status(200).json({ error: err.message });
  }
});

export default classRouter;
