import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(academicFacultyValidation.academicFacultySchemaValidation),
  academicFacultyController.createAcademicFaculty,
);

router.get('/',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.student,USER_ROLE.faculty), academicFacultyController.getAllAcademicFaculties);

router.patch(
  '/:id',
  validateRequest(
    academicFacultyValidation.academicFacultySchemaValidation.partial(),
  ),
  academicFacultyController.updateAcademicFaculty,
);
router.get('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.student,USER_ROLE.faculty), academicFacultyController.getSpecificAcademicFaculties);

export const academicFacultyRouter = router;
