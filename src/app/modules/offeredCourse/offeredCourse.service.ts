import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourseModel } from './offeredCourse.model';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { CourseModel } from '../course/course.model';

/* create offeredCourse Services controller */

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
  const { semesterRegistration, academicFaculty, academicDepartment , course } = payload;

  /* does the course registered  */

  const isSemesterRegistrationExits =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is not registered !');
  }


  /* academic semester */

  const academicSemester = isSemesterRegistrationExits.academicSemester;

  /* does the academic faculty exits */

  const isAcademicFacultyExits =
    await AcademicFacultyModel.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found !');
  }

  /*  does the academic department is exit or not */

  const isAcademicDepartmentExits =
    await AcademicDepartmentModel.findById(academicDepartment);
  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found !');
  }

  /*  does the course is exit or not */


  const isCourseExits = await CourseModel.findById(course);

  if(!isCourseExits){
     throw new AppError(
       httpStatus.NOT_FOUND,
       'Course not found !',
     );
  }



  const result = await OfferedCourseModel.create({...payload,academicSemester});
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
};
