import express from 'express'
import { academicSemesterController } from './academicSemester.controller'
import validateRequest from '../../middleware/validateRequest'
import academicSemesterValidation from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation),
  academicSemesterController.createAcademicSemester,
)

router.get('/', academicSemesterController.getAllAcademicSemesters)

router.get('/:id', academicSemesterController.getSpecificAcademicSemester)

router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.partial()),
  academicSemesterController.updateSpecificAcademicSemester,
)

export const academicSemesterRoutes = router
