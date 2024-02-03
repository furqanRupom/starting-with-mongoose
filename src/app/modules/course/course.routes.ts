import express from 'express';
import { courseController } from './course.controller';
import { courseValidation } from './course.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/create-course',auth('admin','superAdmin'), courseController.createCourse);
router.get('/',auth('admin','faculty','student','superAdmin'), courseController.getAllCourses);
router.patch(
  '/:id',
  auth('admin','superAdmin'),
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);
router.get(
  '/:id',
  auth('admin', 'faculty', 'student','superAdmin'),
  courseController.getSingleCourse,
);

router.delete(
  '/:id',
  auth('admin','superAdmin'),
  courseController.deleteCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth('admin','superAdmin'),
  validateRequest(courseValidation.courseFacultyValidation),
  courseController.assignFaculties,
);
router.delete(
  '/:id/remove-faculties',
  auth('admin','superAdmin'),
  courseController.deleteCourseFaculties,
);

export const courseRoutes = router;
