import express from 'express'
import { userController } from './user.controller'
import { studentValidations } from '../student/student.validation'
import validateRequest from '../../middleware/validateRequest'
import { facultyValidations } from '../faculty/faculty.validation'
import { AdminValidations } from '../admin/admin.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'


const router = express.Router()


router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.studentValidationSchema),
  userController.createStudentController,
)

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoutes = router
