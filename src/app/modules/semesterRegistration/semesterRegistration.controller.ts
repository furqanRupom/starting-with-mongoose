import catchAsync from '../../utils/catchAsync';
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
});

const getALlSemesterRegistration = catchAsync(async (req, res) => {});

export const semesterRegistrationController = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  updateSingleSemesterRegistration,
  getALlSemesterRegistration,
};
