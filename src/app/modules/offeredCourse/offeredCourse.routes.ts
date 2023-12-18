import express from 'express';
import { offeredCourseController } from './offeredCourse.controller';
import validateRequest from '../../middleware/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';

const router = express.Router();

/*  create offered courses */

router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidations.offeredCourseSchemaValidation),
  offeredCourseController.createOfferedCourse,
);




export const offeredCourseRoutes = router;