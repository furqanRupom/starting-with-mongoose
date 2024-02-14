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
import QueryBuilder from '../../builder/QueryBuilder';
import { StudentModel } from '../student/student.model';
import bcrypt from 'bcryptjs';

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
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
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

const updateOfferedCourseFromDB = async (
  id: string,
  payload: Pick<
    IOfferedCourse,
    'faculty' | 'startTime' | 'endTime' | 'section' | 'maxCapacity' | 'days'
  >,
) => {
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

  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'The Semester status should be  "UPCOMING" otherwise you cannot update a offered course',
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
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This faculty is not available for this course`,
    );
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

/* all course */

const retrieveAllOfferedCoursesFromDB = async (query: any) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourseModel.find(), query)
    .filter()
    .paginate()
    .sort();
  const result = await offeredCourseQuery.modelQuery;
  const meta = offeredCourseQuery.countTotal();
  return {
    meta,
    result,
  };
};

/* single course  */

const singleOfferedCoursesFromDB = async (id: string) => {
  const result = await OfferedCourseModel.findById(id);
  return result;
};

/* delete course */

const deleteOfferedCourseFromDB = async (id: string) => {
  /* check the registration semester exit or not  */

  const isOfferedCourseExits = await OfferedCourseModel.findById(id);

  if (!isOfferedCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'offered course not found ');
  }

  /* check the course status is 'UPCOMING' or not */

  const semesterRegistration = await SemesterRegistrationModel.findById(
    isOfferedCourseExits.semesterRegistration,
  );

  if (!semesterRegistration) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'semester registration not found ',
    );
  }

  if (semesterRegistration.status !== 'UPCOMING') {
    if (!semesterRegistration) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'You cannot delete a course while course status is UPCOMING ',
      );
    }
  }

  const result = await OfferedCourseModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'cannot delete this particular offered course !',
    );
  }
};

/* get my offered course */

const getMyOfferedCourseFromDB = async (userId: string, query: any) => {
  /* pagination setup */
  const limit = Number(query.limit) || 10;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * limit;

  /* is user or student exit */

  const student = await StudentModel.findOne({ id: userId });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exit');
  }

  /* get current ongoing courses  */

  const getCurrentOngoingRegistrationSemester =
    await SemesterRegistrationModel.findOne({ status: 'ONGOING' });

  console.log(getCurrentOngoingRegistrationSemester);
  if (!getCurrentOngoingRegistrationSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Current on going semester not found !',
    );
  }

  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const aggregationQuery = [
    /* matched semester registration
     matched student academic faculty
     matched student academic department
    */
    {
      $match: {
        semesterRegistration: getCurrentOngoingRegistrationSemester._id,
        academicFaculty: student.academicFaculty,
        academicDepartment: student.academicDepartment,
      },
    },

    /* look up stage : for get what kinds of course we have  */

    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },

    /*  we have to unwind (separate ) every courses  */

    {
      $unwind: '$course',
    },

    /* get all the enrolled courses for compare ongoing offered course than we do our other operation */

    {
      $lookup: {
        from: 'enrolledcourses',
        /* declare necessary variables */
        let: {
          ongoingSemesterRegistration:
            getCurrentOngoingRegistrationSemester._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              /* $expr for multiple filtering  */
              $expr: {
                $and: [
                  /* $$ for variable */

                  /*   student semester registration and enrolled course semester registration is equal or not */
                  {
                    $eq: [
                      '$semesterRegistration',
                      '$$ongoingSemesterRegistration',
                    ],
                  },

                  /* check student id is same */
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  /* is enrolled : true */
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourse',
      },
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: { currentStudent: student._id },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],

        as: 'completedCourses',
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: '$completedCourses',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisiteFullFilled: {
          $or: [
            { $eq: ['$course.prerequisiteCourses', []] },
            {
              $setIsSubset: [
                '$course.prerequisiteCourses.course',
                '$completedCourseIds',
              ],
            },
          ],
        },
        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourse',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisiteFullFilled: true,
      },
    },
  ];

  const result = await OfferedCourseModel.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);

  const total = (await OfferedCourseModel.aggregate(aggregationQuery)).length;
  const totalPage = Math.ceil(page / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result
  };
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseFromDB,
  retrieveAllOfferedCoursesFromDB,
  singleOfferedCoursesFromDB,
  deleteOfferedCourseFromDB,
  getMyOfferedCourseFromDB,
};
