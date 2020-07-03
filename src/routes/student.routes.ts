import { Router } from 'express';
import { getRepository , getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import Student from '../models/Student';
import StudentRepository from '../repositories/StudentRepository';

const studentRouter = Router();

studentRouter.post('/', async (request, response) => {
  try {
    const repo = getRepository(Student);
    const { key, name, email } = request.body;

    const student = repo.create({
      key,
      name,
      email,
    });

    const errors = await validate(student);

    if (errors.length === 0) {
      const res = await repo.save(student);
      return response.status(201).json(res);
    }
    return response.status(400).json(errors);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).send();
  }
});

studentRouter.get('/', async (request, response) => {
  response.json(await getRepository(Student).find());
});

studentRouter.put('/:id', async(request, response) =>{
  try{
    const repo = getCustomRepository(StudentRepository);
    return await repo.deleteStudent(request, response);
  } catch (err) {
    return response.status(200).json({
      error: err.message
    });
  }
});

studentRouter.delete('/:id', async(request, response) =>{
  try {
    const repo = getCustomRepository(StudentRepository);
    return await repo.deleteStudent(request, response);
  } catch (err){
    return response.status(200).json({
      error: err.message
    });
  }
});

export default studentRouter;
