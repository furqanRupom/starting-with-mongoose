import express from  "express"
import validateRequest from "../../middleware/validateRequest";
import { authValidations } from "./auth.validation";
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();


/* user login */

router.post('/login',validateRequest(authValidations.loginValidationSchema),authController.loginUser)

/* change password */

router.post(
  '/change-password',
  auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student,USER_ROLE.superAdmin),
  validateRequest(authValidations.changePasswordValidationSchema),
  authController.changePassword,
);


/* refresh token */


router.post('/refresh-token',validateRequest(authValidations.refreshTokenValidationSchema),authController.refreshToken);



/* forget password routes */

router.post('/forget-password',validateRequest(authValidations.forgetPasswordValidationSchema),authController.forgetPassword)


/* reset password routes */

router.post('/reset-password',validateRequest(authValidations.resetPasswordValidationSchema),authController.resetPassword)

export const  authRoutes = router;