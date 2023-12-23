import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';
import auth from '../../middleware/auth';



const router = express.Router();

// define routes


router.get('/:id',auth('admin'), AdminControllers.getSingleAdmin);
router.delete('/:id',auth('admin'), AdminControllers.deleteAdmin);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(AdminValidations.updateAdminValidationSchema),
AdminControllers.updateAdmin,
);
router.get('/',auth('admin'), AdminControllers.getAllAdmins);

export const adminRoutes = router;
