import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { userServices } from './user.service'
import { NextFunction, Request, Response } from 'express'
import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'


const createStudentController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { password, student: studentData } = req.body
    // const parseStudentData = userValidation.parse(studentData)
    const result = await userServices.createStudentIntoDB(password, studentData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users created successfully',
      data: result,
    })
  },
)

export const userController = {
  createStudentController,
}
