import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourseModel } from '../offeredCourse/offeredCourse.model';
import { IEnrolledCourses } from './enrolledCourses.interface';
import EnrolledCoursesModel from './enrolledCourses.model';
import { StudentModel } from '../student/student.model';
import { startSession } from 'mongoose';
import { CourseModel } from '../course/course.model';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { FacultyModel } from '../faculty/faculty.model';
import { calculateGradeAndPoints } from './enrolledCourses.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createdEnrolledCoursesIntoDB = async (
  userId: string,
  payload: IEnrolledCourses,
) => {
  /**
   * step-1 : check if the offered course is exits.
   * step-2 : check if the offered course is already enrolled by student
   * enrolledCourseModel --- offeredCourse --- userId
   * step-3 : create an enrolled course.
   */

  const session = await startSession();

  try {
    session.startTransaction();

    const { offeredCourse } = payload;

    const isOfferedCourseExit =
      await OfferedCourseModel.findById(offeredCourse);

    if (!isOfferedCourseExit) {
      throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found ');
    }

    const student = await StudentModel.findOne({ id: userId }, { _id: 1 });

    if (!student) {
      throw new AppError(httpStatus.NOT_FOUND, 'student not found ');
    }

    /* check is already student is enrolled a course  */

    const isAlreadyEnrolled = await EnrolledCoursesModel.findOne({
      semesterRegistration: isOfferedCourseExit.semesterRegistration,
      offeredCourse,
      student: student._id,
    });

    if (isAlreadyEnrolled) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This student  already enrolled this course ! ',
      );
    }

    /*  check the all the seat is booked or not  */

    if (isOfferedCourseExit.maxCapacity <= 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'All the seat has been booked for this course ! ',
      );
    }

    const course = await CourseModel.findById(isOfferedCourseExit.course);

    const semesterRegistration = await SemesterRegistrationModel.findById(
      isOfferedCourseExit.semesterRegistration,
    ).select('maxCredit');

    if (!semesterRegistration) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        ' Cannot find any Semester Registration ! ',
      );
    }

    /*

  check total credits exceeds credits

   totalEnrolledCoursesCredits + newEnrolledCoursesCredits > maxCredits

   if its happens than we will throw an error;

  1. we have to do in mongodb aggregate
  2. first of all we do  $match operation.We have to get how many courses enroll by this following student.
  3. $lookup . after that we do lookup to get the sum of credits
  4. $unwind => we can use unwind with our necessary following information
  5.$group => we will do grouping operation to get the sum of of total credits
  6. $project

  */

    /*  Total Credits  */

    const enrolledCourses = await EnrolledCoursesModel.aggregate([
      {
        $match: {
          semesterRegistration: isOfferedCourseExit.semesterRegistration,
          student: student._id,
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'enrolledCourse',
        },
      },
      {
        $unwind: '$enrolledCourse',
      },
      {
        $group: {
          _id: null,
          totalEnrollCredits: { $sum: '$enrolledCourse.credits' },
        },
      },
      {
        $project: { _id: 0, totalEnrollCredits: 1 },
      },
    ]);

    /* sum total amount of credits  */
    const totalCredits =
      enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrollCredits : 0;
    console.log(totalCredits);

    if (
      totalCredits &&
      totalCredits + course?.credits > semesterRegistration?.maxCredit
    ) {
      throw new AppError(
        httpStatus.NOT_EXTENDED,
        'You have exceeded maximum numbers of credits',
      );
    }

    /* create a enrolled course  */

    const result = await EnrolledCoursesModel.create(
      [
        {
          semesterRegistration: isOfferedCourseExit.semesterRegistration,
          academicSemester: isOfferedCourseExit.academicSemester,
          academicFaculty: isOfferedCourseExit.academicFaculty,
          academicDepartment: isOfferedCourseExit.academicDepartment,
          student: student._id,
          faculty: isOfferedCourseExit.faculty,
          course: isOfferedCourseExit.course,
          isEnrolled: true,
          offeredCourse,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'failed to create enrolled courses ! ',
      );
    }

    /* if course enrolled than reduce one in max capacity */

    const maxCapacity = isOfferedCourseExit.maxCapacity;

    await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    session.commitTransaction();
    session.endSession();

    return result;
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new Error(error.message);
  }

};



/* retrieve my enrolled courses */

const retrieveMyEnrolledCoursesFromDB = async (userId:string,query:Record<string,unknown>) => {

  /* get the student */

  const  student = await StudentModel.findOne({id:userId});

  if(!student){
    throw new AppError(httpStatus.NOT_FOUND,'student not found')
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCoursesModel.find({ student: student._id }).populate(
      'academicFaculty academicDepartment',
    ),
    query,
  ).paginate().filter().sort();

  const result = await enrolledCourseQuery.modelQuery;
  const meta = await enrolledCourseQuery.countTotal();
  return {
    meta,
    result
  }; 

}

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<IEnrolledCourses>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  const isOfferedCourseExists =
    await OfferedCourseModel.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }
  const isStudentExists = await StudentModel.findById(student);

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const faculty = await FacultyModel.findOne({ id: facultyId }, { _id: 1 });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const isCourseBelongToFaculty = await EnrolledCoursesModel.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden! !');
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1) +
      Math.ceil(midTerm) +
      Math.ceil(classTest2) +
      Math.ceil(finalTerm)

    const result = calculateGradeAndPoints(totalMarks);

    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  /*
 const myObject = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};
console.log(Object.entries(myObject))


expected output =>
[
  ['key1', 'value1'],
  ['key2', 'value2'],
  ['key3', 'value3']
]

note : key1 will be key and value will be value1 and so on for each array.

for (const [key, value] of Object.entries(myObject)) {
  console.log(`${key}: ${value}`);
}


  */

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCoursesModel.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new: true,
    },
  );

  return result;
};

export const enrolledCoursesServices = {
  createdEnrolledCoursesIntoDB,
  updateEnrolledCourseMarksIntoDB,
  retrieveMyEnrolledCoursesFromDB
};
