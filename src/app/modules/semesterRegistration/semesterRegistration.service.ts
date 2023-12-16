import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  const { academicSemester } = payload;
  const isSemesterAlreadyRegistered = await SemesterRegistrationModel.findOne({
    academicSemester,
  });

  /* checking that semester already registered or not */

  if (isSemesterAlreadyRegistered) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Semester has been registered !',
    );
  }

  /* if academicSemester does not exit */

  const isAcademicSemesterExits =
    await AcademicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'We are unable to find this academicSemester',
    );
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

const updateSingleSemesterRegistrationFromDB = async (
  payload: ISemesterRegistration,
  id: string,
) => {};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const getAllSemester = new QueryBuilder(
    SemesterRegistrationModel.find(),
    query,
  )
    .filter()
    .sort()
    .paginate();

  const result = await getAllSemester.modelQuery;

  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationFromDB,
  updateSingleSemesterRegistrationFromDB,
  getAllSemesterRegistrationFromDB,
};
