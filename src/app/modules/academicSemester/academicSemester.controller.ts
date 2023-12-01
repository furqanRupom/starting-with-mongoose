import catchAsync from '../../utils/catchAsync'
import { Request, Response, NextFunction } from 'express'
import { academicSemesterServices } from './academicSemester.services'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'



const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    )

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'academic semester is created successfully !',
      data: result,
    })
  },
)

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicSemesterServices.getAllAcademicSemestersFromDB()
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All the academic semesters data fetched successfully !',
      data: result,
    })
  },
)

const getSpecificAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await academicSemesterServices.getSpecificAcademicSemesterFromDB(id)
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Fetched specific semester successfully !',
      data: result,
    })
  },
)

const updateSpecificAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body

    const result =
      await academicSemesterServices.updateSpecificAcademicSemesterFromDB(
        id,
        data,
      )
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Update specific semester successfully !',
      data: result,
    })
  },
)



export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSpecificAcademicSemester,
  updateSpecificAcademicSemester,
}
