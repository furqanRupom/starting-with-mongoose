import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { semesterRegistrationStatus } from './semesterRegistration.constant';
import { startSession } from 'mongoose';
import { OfferedCourseModel } from '../offeredCourse/offeredCourse.model';

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

  /* check if anyone wanna to change UPCOMING status to ENDED status directly  */

  if (
    requestedRegisteredSemesterStatus === semesterRegistrationStatus.UPCOMING &&
    payload.status === semesterRegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change this ${requestedRegisteredSemesterStatus} status to ${payload.status} status`,
    );
  }

  /* check if anyone wanna to change ONGOING status to ENDED status directly  */

  if (
    requestedRegisteredSemesterStatus === semesterRegistrationStatus.ONGOING &&
    payload.status === semesterRegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change this ${requestedRegisteredSemesterStatus} status to ${payload.status} status`,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    {
      runValidators: true,
      new: true,
    },
  );
  return result;
};

/* get single semester registrations */

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

/* retrieve all semester registrations */

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
  const meta = await getAllSemester.countTotal();

  return {
    result,
    meta
  };
};





/*  delete semester registration  */

const deleteSemesterRegistrationFromDB = async (id:string) =>{


  /* check the semester Registration is exit or not  */

  const isSemesterRegistrationExits = await SemesterRegistrationModel.findById(id);


  if(!isSemesterRegistrationExits){
    throw new AppError(httpStatus.NOT_FOUND,'semester registration not found ')
  }

  const semesterRegistrationStatus = isSemesterRegistrationExits.status;

  if(semesterRegistrationStatus !== 'UPCOMING'){
    throw new AppError(
      httpStatus.NOT_FOUND,
      'the semester status is not the "UPCOMING" status ',
    );
  }

  const session = await startSession();

  try {
    session.startTransaction()


    /*  delete offered courses which is belongs to this semester registrations */

    const deleteOfferedCourses = await OfferedCourseModel.deleteMany({semesterRegistration:id},{session})

  if (deleteOfferedCourses) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Cannot delete offered courses ',
    );
  }


  const deleteSemesterRegistration = await SemesterRegistrationModel.findByIdAndDelete(id,{
    session,
    new:true
  })


  if (deleteSemesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cannot delete  this semester Registration ');
  }

  session.commitTransaction();
  session.endSession()

  } catch (error) {
     session.abortTransaction()
     session.endSession()
  }

}

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationFromDB,
  updateSingleSemesterRegistrationFromDB,
  getAllSemesterRegistrationFromDB,
  deleteSemesterRegistrationFromDB
};
