import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';
import auth from '../../middleware/auth';



const router = express.Router();

// define routes


router.get('/:id',auth('admin','superAdmin'), AdminControllers.getSingleAdmin);
router.delete('/:id',auth('admin','superAdmin'), AdminControllers.deleteAdmin);
router.patch(
  '/:id',
  auth('admin','superAdmin'),
  validateRequest(AdminValidations.updateAdminValidationSchema),
AdminControllers.updateAdmin,
);
router.get('/',auth('admin','superAdmin'), AdminControllers.getAllAdmins);

export const adminRoutes = router;
