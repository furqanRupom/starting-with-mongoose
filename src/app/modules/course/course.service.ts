import { startSession } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { ICourse, ICourseFaculty } from './course.interface';
import { CourseFacultyModel, CourseModel } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: ICourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('prerequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id);
  return result;
};

/* update course */

const updateCourserFromDB = async (id: string, payload: Partial<ICourse>) => {
  const { prerequisiteCourses, ...courseRemainingData } = payload;

  const session = await startSession();

  try {
    session.startTransaction();

    //step1: basic course info update
    const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    // check if there is any pre requisite courses to update
    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = prerequisiteCourses
        .filter(el => el.course && el.isDeleted)
        .map(el => el.course);

      const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // filter out the new course fields
      const newPreRequisites = prerequisiteCourses?.filter(el => el.course && !el.isDeleted,);

      const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { prerequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      const result = await CourseModel.findById(id).populate(
        'prerequisiteCourses.course',
      );

      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};



const deleteCourseFromDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};


const assignFacultiesIntoDB = async (
  courseId: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    courseId,
    {
      $addToSet: { faculties: { $each: payload } },
      course:courseId
    },
    { upsert: true, new: true },
  );
  return result;
};


/* get all assign faculties */

const getAllAssignFacultiesFromDB = async (courseId:string)=>{
  console.log(courseId);
   const getAllAssignFaculties = await CourseFacultyModel.findById(courseId).populate('faculties');
   console.log(getAllAssignFaculties);
   const result = await CourseFacultyModel.find();
   console.log(result);

   return getAllAssignFaculties;
}




const deleteCourseFacultiesFromDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { upsert: true, new: true },
  );
  return result;
};


export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourserFromDB,
  deleteCourseFromDB,
  assignFacultiesIntoDB,
  deleteCourseFacultiesFromDB,
  getAllAssignFacultiesFromDB
};
