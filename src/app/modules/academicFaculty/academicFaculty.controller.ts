import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { AcademicFacultyServices } from './academicFaculty.services'
import sendResponse from '../../utils/sendResponse'
import { enrolledCoursesServices } from '../EnrolledCourses/enrolledCourses.service'
import httpStatus from 'http-status'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body

    const result =
      await AcademicFacultyServices.createAcademicFacultyIntoDB(payload)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'academic faculty created successfully !',
      data: result,
    })
  },
)

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB()
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Fetched All the academic faculties successfully !',
      data: result,
    })
  },
)
const getSpecificAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const {id} = req.params;
    const result = await AcademicFacultyServices.getSpecificAcademicFacultyFromDB(id)
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Fetched Single Academic faculty  successfully !',
      data: result,
    })
  },
)

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const payload = req.body
    const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(id,payload);
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Update academic faculty successfully !',
        data: result,
      })
  },
)



export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  updateAcademicFaculty,
  getSpecificAcademicFaculties,
  

}
