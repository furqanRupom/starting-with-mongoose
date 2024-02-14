import express from 'express';
import { courseController } from './course.controller';
import { courseValidation } from './course.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();


/* create course  */

router.post(
  '/create-course',
  auth('admin', 'superAdmin'),
  courseController.createCourse,
);


/* get our all courses */

router.get(
  '/',
  auth('admin', 'faculty', 'student', 'superAdmin'),
  courseController.getAllCourses,
);


/* update course */

router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);

/* get single courses */


router.get(
  '/:id',
  auth('admin', 'faculty', 'student', 'superAdmin'),
  courseController.getSingleCourse,
);


/* delete courses routes */

router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  courseController.deleteCourse,
);

/* get assign faculties routes */

router.get(
  '/:courseId/get-faculties',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.student,USER_ROLE.faculty),
  courseController.getAssignFaculties,
);

/* update courses for assign faculties routes  */

router.put(
  '/:courseId/assign-faculties',
  auth('admin', 'superAdmin'),
  (req,res,next) => {
    console.log(req.body);
    next()
  },
  validateRequest(courseValidation.courseFacultyValidation),
  courseController.assignFaculties,
);


/* remove faculty from course routes  */

router.delete(
  '/:id/remove-faculties',
  auth('admin', 'superAdmin'),
  courseController.deleteCourseFaculties,
);

export const courseRoutes = router;
