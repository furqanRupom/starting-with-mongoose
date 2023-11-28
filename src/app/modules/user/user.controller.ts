import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse"
import { userServices } from "./user.service"
import { NextFunction, Request,Response } from "express"

const createStudentController = async (req: Request, res: Response,next:NextFunction) => {
  try {

    const { password, student: studentData } = req.body
    // const parseStudentData = userValidation.parse(studentData)
    const result = await userServices.createStudentIntoDB(password, studentData)
    sendResponse(res,{
      statusCode: httpStatus.OK,
      success:true,
      message:'Users created successfully',
      data:result,
    })
  } catch (error) {
    next(error)
  }
}



export const userController = {
    createStudentController
}