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
  const payload = req.body;
  console.log(payload);
  const result = await authServices.changePassword(user,payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Password changed  successfully !',
      data: result,
    });
})


const refreshToken = catchAsync(async(req,res)=>{
  const token = req.cookies;
  console.log(token);

  const result = await authServices.refreshToken(token);
  console.log(result)

   sendResponse(res, {
     success: true,
     statusCode: httpStatus.OK,
     message: 'Access token retrieve Successfully !',
     data: result,
   });
});

const forgetPassword = catchAsync(async(req,res)=>{

  const {id} = req.body;
  const result = await authServices.forgetPassword(id)

   sendResponse(res, {
     success: true,
     statusCode: httpStatus.OK,
     message: 'Reset Link is generated Successfully !',
     data: result,
   });
})


const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string
  const result = await authServices.resetPassword(req.body,token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reset password  Successfully !',
    data: result,
  });
});


export const authController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword
};
