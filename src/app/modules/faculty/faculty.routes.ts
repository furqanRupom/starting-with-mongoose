import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyControllers } from './faculty.controller';
import {  facultyValidations } from './faculty.validation';
import auth from '../../middleware/auth';

const router = express.Router();

// define routes


router.get('/:id', FacultyControllers.getSingleFaculty);
router.delete('/:id',FacultyControllers.deleteFaculty );
router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.get('/',auth(), FacultyControllers.getAllFaculties);

export const facultyRoutes = router;
