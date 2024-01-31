import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { enrolledCoursesValidations } from './enrolledCourses.validation';
import { enrolledCourseController } from './enrolledCourses.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(enrolledCoursesValidations.enrolledCoursesValidationSchema),
  enrolledCourseController.createEnrolledCourse,
);

router.put(
  '/update-course-marks',
  auth('faculty'),
  validateRequest(
    enrolledCoursesValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  enrolledCourseController.updateEnrolledCourseMarks,
);

export const enrolledCourseRoutes = router;
