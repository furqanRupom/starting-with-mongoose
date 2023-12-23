import express from  "express"
import validateRequest from "../../middleware/validateRequest";
import { authValidations } from "./auth.validation";
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();


router.post('/login',validateRequest(authValidations.loginValidationSchema),authController.loginUser)


router.post(
  '/change-password',
  auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
  validateRequest(authValidations.changePasswordValidationSchema),
  authController.changePassword,
);



router.post('/refresh-token',authController.refreshToken)

export const  authRoutes = router;