import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.academicFacultySchemaValidation),
  academicFacultyController.createAcademicFaculty,
);

router.get('/', academicFacultyController.getAllAcademicFaculties);

router.patch(
  '/:id',
  validateRequest(
    academicFacultyValidation.academicFacultySchemaValidation.partial(),
  ),
  academicFacultyController.updateAcademicFaculty,
);
router.get('/:id', academicFacultyController.getSpecificAcademicFaculties);

export const academicFacultyRouter = router;
