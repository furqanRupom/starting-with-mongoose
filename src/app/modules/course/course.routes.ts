import express from 'express';
import { courseController } from './course.controller';
import { courseValidation } from './course.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post('/create-course', courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.patch(
  '/:id',
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);
router.get('/:id', courseController.getSingleCourse);

router.delete('/:id', courseController.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidation.courseFacultyValidation),
  courseController.assignFaculties,
);
router.delete(
  '/:id/remove-faculties',

  courseController.deleteCourseFaculties,
);

export const courseRoutes = router;
