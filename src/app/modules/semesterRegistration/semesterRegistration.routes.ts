import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.semesterRegistrationSchemaValidation,
  ),
  semesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidations.semesterRegistrationUpdateSchemaValidation,
  ),
  semesterRegistrationController.updateSingleSemesterRegistration,
);

router.get('/', semesterRegistrationController.getALlSemesterRegistration);
