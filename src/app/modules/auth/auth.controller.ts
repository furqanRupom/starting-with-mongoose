import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {

  const result = await authServices.loginUser(req.body);

   sendResponse(res, {
     success: true,
     statusCode: httpStatus.OK,
     message: 'User Login  successfully !',
     data: result,
   });
});


const changePassword = catchAsync (async (req,res) => {

  const user = req.user;
  const {...passwordData} = req.body;
  const result = await authServices.changePassword(user,passwordData);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Password changed  successfully !',
      data: result,
    });
})
export const authController = {
  loginUser,
  changePassword
};
