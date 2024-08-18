/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import {  createStudentZodValidationSchema } from '../student/student.zod.validation';
import validateRequest from '../../middlewares/validateRequest';


const router = express.Router();

 

router.post('/create-student', validateRequest(createStudentZodValidationSchema), UserControllers.createStudent);

export const UserRoutes = router;