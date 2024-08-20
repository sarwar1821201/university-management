import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.zod.validation';

const router = express.Router();

 // will call controller function
  //router.post('/create-student', StudentControllers.createStudent);

  router.get('/', StudentControllers.getAllStudents);

 router.get('/:studentId', StudentControllers.getSingleStudent);

 router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);


  // export into the server
    export const StudentRoutes=router;

