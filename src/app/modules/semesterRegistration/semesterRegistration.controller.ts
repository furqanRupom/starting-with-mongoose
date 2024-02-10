import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );
  return result;
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

  return result;
});

const updateSingleSemesterRegistration = catchAsync(async (req, res) => {
  const payload =req.body;
  const {id}= req.params;
  const result = await semesterRegistrationServices.updateSingleSemesterRegistrationFromDB(payload,id)
  return result;
});

const getALlSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query)
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Retrieve all semester registration successfully',
     data: result.result,
     meta:result.meta
   })
});

const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result =
    await semesterRegistrationServices.deleteSemesterRegistrationFromDB(
      id
    );
  return result;
});

export const semesterRegistrationController = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  updateSingleSemesterRegistration,
  getALlSemesterRegistration,
  deleteSemesterRegistration
};
