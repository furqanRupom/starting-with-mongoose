/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

// express works => what will be the response and error we will handle and control in this routes also others database operation as well;









const getAllStudentsController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentServices.getAllStudentsFromDB()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrieve successfully',
      data: result,
    })
  },
)

const getSingleStudentController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const result = await StudentServices.getSingleStudentFromDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieve successfully',
      data: result,
    })
  },
)

const deleteStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await StudentServices.deleteSingleStudentFromDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Delete successfully',
      data: result,
    })
  },
)

const updateStudentController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const {student} = req.body
    const result = await StudentServices.updateSingleStudentFromDB(id, student)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Update successfully',
      data: result,
    })
  },
)


export const StudentControllers = {
  getAllStudentsController,
  getSingleStudentController,
  deleteStudentController,
  updateStudentController,
}
