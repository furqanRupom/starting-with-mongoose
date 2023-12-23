import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {

  const result = await authServices.loginUser(req.body);

  const {refreshToken} = result;
  res.cookie('refreshToken',refreshToken,{
     secure:config.node_env === 'production',
     httpOnly:true
  })

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

const refreshToken = catchAsync(async(req,res)=>{
  const token = req.cookies;
  const result = await authServices.refreshToken(token);
   sendResponse(res, {
     success: true,
     statusCode: httpStatus.OK,
     message: 'Token Refresh Successfully !',
     data: result,
   });
})
export const authController = {
  loginUser,
  changePassword,
  refreshToken
};
