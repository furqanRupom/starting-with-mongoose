import express from 'express'
import { userController } from './user.controller'
import { studentValidations } from '../student/student.validation'
import validateRequest from '../../middleware/validateRequest'

const router = express.Router()


router.post(
  '/create-student',
  validateRequest(studentValidations.studentValidationSchema),
  userController.createStudentController,
)

router.post('/create-admin')
router.post('/create-faculty')

export const userRoutes = router
