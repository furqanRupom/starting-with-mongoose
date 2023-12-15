import express from 'express'
import { userController } from './user.controller'
import { studentValidations } from '../student/student.validation'
import validateRequest from '../../middleware/validateRequest'
import { facultyValidations } from '../faculty/faculty.validation'
import { AdminValidations } from '../admin/admin.validation'


const router = express.Router()


router.post(
  '/create-student',
  validateRequest(studentValidations.studentValidationSchema),
  userController.createStudentController,
)

router.post('/create-faculty',validateRequest(facultyValidations.createFacultyValidationSchema),userController.createFaculty)
router.post('/create-admin',validateRequest(AdminValidations.createAdminValidationSchema),userController.createAdmin)

export const userRoutes = router
