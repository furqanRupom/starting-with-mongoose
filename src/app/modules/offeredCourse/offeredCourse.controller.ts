import catchAsync from '../../utils/catchAsync';
import { offeredCourseServices } from './offeredCourse.service';

/* create offered course  */

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  return result;
});

/* update offered course  */

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.updateOfferedCourseFromDB(
    id,
    req.body,
  );
  return result;
});

/* update offered course  */

const singleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.updateOfferedCourseFromDB(
    id,
    req.body,
  );
  return result;
});



/* delete offered course */

const deleteOfferedCourse = catchAsync(async(req,res)=> {
  const {id} = req.params;
  const result = await offeredCourseServices.deleteOfferedCourseFromDB(id);
  return result;
})


const getAllOfferedCourse = catchAsync(async(req,res)=>{
  const result = await offeredCourseServices.retrieveAllOfferedCoursesFromDB
})
export const offeredCourseController = {
  createOfferedCourse,
  updateOfferedCourse,
  singleOfferedCourse,
  deleteOfferedCourse,
  getAllOfferedCourse
};
