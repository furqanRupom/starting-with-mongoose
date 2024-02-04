import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { enrolledCoursesValidations } from './enrolledCourses.validation';
import { enrolledCourseController } from './enrolledCourses.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();



/* get my enrolled courses */

router.get('/my-enrolled-course',auth(USER_ROLE.student),enrolledCourseController.retrieveEnrolledCourses)

/* create enrolled courses */

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student,USER_ROLE.admin,USER_ROLE.superAdmin),
  validateRequest(enrolledCoursesValidations.enrolledCoursesValidationSchema),
  enrolledCourseController.createEnrolledCourse,
);

/* update enrolled courses */

router.put(
  '/update-course-marks',
  auth(USER_ROLE.faculty),
  validateRequest(
    enrolledCoursesValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  enrolledCourseController.updateEnrolledCourseMarks,
);

export const enrolledCourseRoutes = router;
