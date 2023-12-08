import express from 'express'
import { userController } from './user.controller'
import { studentValidations } from '../student/student.validation'
import validateRequest from '../../middleware/validateRequest'
import { facultyValidation } from '../faculty/faculty.validation'

const router = express.Router()


router.post(
  '/create-student',
  validateRequest(studentValidations.studentValidationSchema),
  userController.createStudentController,
)

router.post('/create-faculty',validateRequest(facultyValidation.FacultySchemaValidation),userController.createFaculty)
router.post('/create-admin')

export const userRoutes = router
