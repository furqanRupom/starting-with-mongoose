/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { FacultyServices } from './faculty.service';
import catchAsync from '../../utils/catchAsync';

// express works => what will be the response and error we will handle and control in this routes also others database operation as well;

const getAllFaculties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('get all faculties ',req.user)
    const result = await FacultyServices.getAllFacultiesFromDB(req.query)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty retrieve successfully',
      data: result,
    });
  },
);

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty retrieve successfully',
      data: result,
    });
  },
);

const deleteFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id} = req.params;
    const result = await FacultyServices.deleteSingleFacultyFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty Delete successfully',
      data: result,
    });
  },
);

const updateFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await FacultyServices.updateSingleFacultyFromDB(id, faculty);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty Update successfully',
      data: result,
    });
  },
);

export const FacultyControllers = {
 getAllFaculties,
 getSingleFaculty,
 deleteFaculty,
 updateFaculty,
};
