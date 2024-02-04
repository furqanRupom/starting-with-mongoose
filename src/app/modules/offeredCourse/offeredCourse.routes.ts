import express from 'express';
import { offeredCourseController } from './offeredCourse.controller';
import validateRequest from '../../middleware/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();


/* get my offered courses */

router.get('/my-offered-course',auth(USER_ROLE.student),offeredCourseController.getMyOfferedCourses)

/*  create offered courses */

router.post(
  '/create-offered-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(offeredCourseValidations.offeredCourseSchemaValidation),
  offeredCourseController.createOfferedCourse,
);

/* update offered course */

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(offeredCourseValidations.offeredCourseSchemaUpdateValidation),
  offeredCourseController.updateOfferedCourse,
);


/* get all offered courses */


router.get('/',auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty), offeredCourseController.getAllOfferedCourse)

/* get single offered course */

router.get('/:id',auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),  offeredCourseController.singleOfferedCourse);





/* delete offered course */

router.delete('/:id',auth(USER_ROLE.superAdmin,USER_ROLE.admin), offeredCourseController.deleteOfferedCourse)



export const offeredCourseRoutes = router;
