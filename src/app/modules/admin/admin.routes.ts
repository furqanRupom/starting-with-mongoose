import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';



const router = express.Router();

// define routes


router.get('/:id', AdminControllers.getSingleAdmin);
router.delete('/:id', AdminControllers.deleteAdmin);
router.patch(
  '/:id',
  validateRequest(AdminValidations.updateAdminValidationSchema),
AdminControllers.updateAdmin,
);
router.get('/', AdminControllers.getAllAdmins);

export const adminRoutes = router;
