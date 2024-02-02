import express, {Request,Response, NextFunction } from 'express'
import { userController } from './user.controller'
import { studentValidations } from '../student/student.validation'
import validateRequest from '../../middleware/validateRequest'
import { facultyValidations } from '../faculty/faculty.validation'
import { AdminValidations } from '../admin/admin.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'
import { upload } from '../../utils/sendImageToCloudinary'


const router = express.Router()


router.post(
  '/create-student',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  upload.single('file'),
  (req:Request,res:Response,next:NextFunction) =>{
      req.body = JSON.parse(req.body.data)
      next()
  },
  validateRequest(studentValidations.studentValidationSchema),
  userController.createStudentController,
)

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
);


/* change status  */

router.post('/change-status/:id',auth('admin','superAdmin'),userController.changeStatus)


/* get me routes for specific student ,faculty and admin   */

router.get('/me',auth('admin','faculty','student','superAdmin'),userController.getMe)

export const userRoutes = router;
