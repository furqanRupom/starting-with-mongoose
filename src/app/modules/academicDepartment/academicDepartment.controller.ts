import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { academicDepartmentServices } from './academicDepartment.services'
import sendResponse from '../../utils/sendResponse'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result =
      await academicDepartmentServices.createAcademicDepartmentIntoDB(payload)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Academic Department Successfully created ',
      data: result,
    })
  },
)



const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.getAllAcademicDepartmentIntoDB(req.query)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Fetched All  Academic Department Successfully ',
      data: result.result,
      meta: result.meta,
    });
  },
)

const getSpecificAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await academicDepartmentServices.getSpecificAcademicDepartmentFromDB(id)
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Fetched Specific  Academic Department Successfully ',
      data: result,
    })
  },
)

const updateSpecificAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const payload = req.body

    const result =
      await academicDepartmentServices.updateSpecificAcademicDepartmentFromDB(
        id,
        payload,
      )

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Update  Academic Department Successfully ',
      data: result,
    })
  },
)


export  const academicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSpecificAcademicDepartment,
    updateSpecificAcademicDepartment
}