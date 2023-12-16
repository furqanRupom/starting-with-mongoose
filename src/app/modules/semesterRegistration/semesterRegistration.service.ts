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

  /* check any semester registration time in 'UPCOMING' or 'ONGOING'  */

  const isOngoingOrUpcomingSemester = await SemesterRegistrationModel.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });

  if (isOngoingOrUpcomingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The Semester is already in ${isOngoingOrUpcomingSemester.status}`,
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

  /* checking that semester already registered or not */

  const isSemesterAlreadyRegistered = await SemesterRegistrationModel.findOne({
    academicSemester,
  });

  if (isSemesterAlreadyRegistered) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Semester has been registered !',
    );
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};


/* update semester registrations  */


const updateSingleSemesterRegistrationFromDB = async (
  payload: ISemesterRegistration,
  id: string,
) => {
  /* check that is semester registration is exits or not */

  const isSemesterRegistrationExits =
    await SemesterRegistrationModel.findById(id);

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  /* check if the semester registrations is ended */

  const requestedRegisteredSemesterStatus = isSemesterRegistrationExits.status;


  if (requestedRegisteredSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This registration has been closed that is why we cannot update this semester registration',
    );
  }
};




/* get single semester registrations */

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};



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
