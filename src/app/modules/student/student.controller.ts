/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentValidationSchema from './student.validation'
import sendResponse from '../../utils/sendResponse'
import httpStatus from "http-status"

// express works => what will be the response and error we will handle and control in this routes also others database operation as well;



const getAllStudentsController = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrieve successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}






const getSingleStudentController = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params
    const result = await StudentServices.getSingleStudentFromDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieve successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }

}



const deleteStudentController = async (req:Request,res:Response,next:NextFunction) =>{
 try {
   const { id } = req.params
   const result = await StudentServices.deleteSingleStudentFromDB(id)
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Student Delete successfully',
     data: result,
   })
 } catch (error) {
   next(error)
 }
}



const updateStudentController = async (req:Request,res:Response,next:NextFunction) => {

  try {
    const { id } = req.params
    const data = req.body
    const result = await StudentServices.updateSingleStudentFromDB(id, data)
       sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'Student Update successfully',
         data: result,
       })
  } catch (error) {
    next(error)
  }

}

export const StudentControllers = {
  getAllStudentsController,
  getSingleStudentController,
  deleteStudentController,
  updateStudentController
}
