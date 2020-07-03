import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import Content from '../models/Content';
import ContentRepository from '../repositories/ContentRepository';

const contentRouter = Router();

contentRouter.post('/', async (request, response) => {
  try {
    const repo = getRepository(Content);
    const res = await repo.save(request.body);
    return response.status(201).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).send();
  }
});

contentRouter.get('/', async (request, response) => {
  response.json(await getRepository(Content).find());
});

contentRouter.put('/:id', async(request, response) =>{
  try{
    const repo = getCustomRepository(ContentRepository);
    return await repo.updateContent(request, response);
  } catch (err) {
    return response.status(200).json({
      error : err.message
    });
  }
});

contentRouter.delete('/:id', async (request, response) =>{
  try {
    const repo = getCustomRepository(ContentRepository);
    return await repo.deleteContent(request, response);
  } catch (err) {
    return response.status(200).json({
      error: err.message
    });
  }
});

export default contentRouter;
