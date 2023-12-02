import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middleware/validateRequest'
import { studentValidations } from './student.validation'

const router = express.Router()

// define routes

router.get('/', StudentControllers.getAllStudentsController)
router.get('/:id', StudentControllers.getSingleStudentController)
router.delete('/:id', StudentControllers.deleteStudentController)
router.patch('/:id',
 validateRequest(studentValidations.updateStudentSchemaValidation)
,StudentControllers.updateStudentController)

export const studentRoutes = router
