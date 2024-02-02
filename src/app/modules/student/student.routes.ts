import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// define routes

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.admin,
    USER_ROLE.student,
  ),
  StudentControllers.getAllStudentsController,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.admin,
    USER_ROLE.student,
  ),
  StudentControllers.getSingleStudentController,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentControllers.deleteStudentController,
);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentSchemaValidation),
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentControllers.updateStudentController,
);

export const studentRoutes = router;
