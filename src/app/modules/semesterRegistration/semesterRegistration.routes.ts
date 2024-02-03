import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.semesterRegistrationSchemaValidation,
  ),
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  semesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.student),
  semesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidations.semesterRegistrationUpdateSchemaValidation,
  ),
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  semesterRegistrationController.updateSingleSemesterRegistration,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.student),
  semesterRegistrationController.getALlSemesterRegistration,
);


router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  semesterRegistrationController.deleteSemesterRegistration,
);




export const semesterRegistrationRoutes = router