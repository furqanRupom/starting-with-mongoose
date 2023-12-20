import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse, ISchedules } from './offeredCourse.interface';
import { OfferedCourseModel } from './offeredCourse.model';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { CourseModel } from '../course/course.model';
import { hasTimeConflict } from './offeredCourse.utils';
import { DaysTypeModel } from './offeredCourse.constant';

/* create offeredCourse Services controller */

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

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

  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found !');
  }

  /* check it the department belongs to the faculty */

  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    academicFaculty,
    _id: academicDepartment,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExits.name} is not belongs to ${isAcademicFacultyExits.name}`,
    );
  }

  /* check the session . if we have duplicate session,semesterRegistration,course or multiple */

  const isMultipleSameSectionAndSemesterRegistrationAndCourseInOfferedCourses =
    await OfferedCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isMultipleSameSectionAndSemesterRegistrationAndCourseInOfferedCourses) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can't have course, semesterRegistration and section same multiple time `,
    );
  }

  /*  a faculty or instructor can not do a course at the same time  */

  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days }, // matched following days
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
   if (hasTimeConflict(assignedSchedules, newSchedule)){
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This faculty is not available for this course`,
    );
   }
     const result = await OfferedCourseModel.create({
       ...payload,
       academicSemester,
     });
  return result;
};



/* update offered course from db  */

const updateOfferedCourseFromDB = async (id:string,payload:Pick<IOfferedCourse,'faculty' | 'startTime' | 'endTime' | 'section' | 'maxCapacity' | 'days'>) => {
  const { faculty, section, maxCapacity, startTime, endTime, days } = payload;

  /*  offered course is exit or not  */

  const isOfferedCourseIsExits = await OfferedCourseModel.findById(id);

  if (!isOfferedCourseIsExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `we don't find any offered course with particular id : ${id}`,
    );
  }

  /*  is faculty is exit or not  */

  const isFacultyExits = await OfferedCourseModel.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, `faculty not found `);
  }




  /* get semesterRegistration from offered course */

  const semesterRegistration = isOfferedCourseIsExits.semesterRegistration;




  /* check the semester status is "UPCOMING" */


  const semesterRegistrationStatus = await SemesterRegistrationModel.findById(semesterRegistration)

  if(semesterRegistrationStatus?.status !== 'UPCOMING'){
    throw new AppError(httpStatus.BAD_REQUEST,'The Semester status should be  "UPCOMING" otherwise you cannot update a offered course')
  }

  /*  a faculty or instructor can not do a course at the same time  */

  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days }, // matched following days
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedules, newSchedule )) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This faculty is not available for this course`,
    );
  }


  const result = await OfferedCourseModel.findByIdAndUpdate(id,payload,{new:true,runValidators:true})
  return result;
}


/* all course */

const retrieveAllOfferedCoursesFromDB = async () => {
  const result = await OfferedCourseModel.find();
  return result;
}


/* single course  */

const singleOfferedCoursesFromDB = async (id:string) => {
  const result = await OfferedCourseModel.findById(id);
  return result;
}


/* delete course */


const deleteOfferedCourseFromDB = async (id:string) => {


 /* check the registration semester exit or not  */

 const isOfferedCourseExits = await OfferedCourseModel.findById(id);


 if(!isOfferedCourseExits){
  throw new AppError(httpStatus.NOT_FOUND,'offered course not found ');
 }


 /* check the course status is 'UPCOMING' or not */


const  semesterRegistration = await SemesterRegistrationModel.findById(isOfferedCourseExits.semesterRegistration);

if(!semesterRegistration){
   throw new AppError(httpStatus.NOT_FOUND, 'semester registration not found ');
}


if(semesterRegistration.status !== 'UPCOMING'){
   if (!semesterRegistration) {
     throw new AppError(
       httpStatus.NOT_FOUND,
       'You cannot delete a course while course status is UPCOMING ',
     );
   }
}


const result = await OfferedCourseModel.findByIdAndDelete(id);

if(!result){
  throw new AppError(httpStatus.BAD_REQUEST,'cannot delete this particular offered course !')
}





}



export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseFromDB,
  retrieveAllOfferedCoursesFromDB,
  singleOfferedCoursesFromDB,
  deleteOfferedCourseFromDB
};
