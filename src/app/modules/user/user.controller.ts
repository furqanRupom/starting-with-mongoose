import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { userServices } from './user.service'
import { NextFunction, Request, Response } from 'express'
import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import jwt, { JwtPayload } from "jsonwebtoken"
import config from '../../config'
import AppError from '../../errors/AppError'


const createStudentController: RequestHandler = catchAsync(
  async (req, res) => {
    console.log(req.file,'file');
    const { password, student: studentData } = req.body
    const result = await userServices.createStudentIntoDB(req.file,password, studentData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users created successfully',
      data: result,
    })
  },
)

const createFaculty:RequestHandler = catchAsync(async(req,res)=>{
  const {password,faculty:facultyData} = req.body;
  const result = await userServices.createFacultyIntoDB(password,facultyData);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"users created successfully",
    data:result
  })
})


const createAdmin:RequestHandler = catchAsync(async(req,res)=>{
  const {password,admin:adminData} = req.body;
  const result = await userServices.createAdminIntoDB(password,adminData);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'users created successfully',
    data:result
  })
})




const getMe: RequestHandler = catchAsync(async (req, res) => {

  const result = await userServices.getMeFromDB(req.user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieve  Successfully ',
    data: result,
  });
});



const changeStatus = catchAsync(async(req,res)=>{
  const {id} = req.params;
  const  payload = req.body;

    const result = await userServices.changeStatusFromDB(id,payload)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Change Status Successfully',
      data: result,
    });
})







export const userController = {
  createStudentController,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus
}
