import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseServices } from './offeredCourse.service';

/* create offered course  */

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'create offered course successfully !',
      data: result,
    })
});

/* update offered course  */

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.updateOfferedCourseFromDB(
    id,
    req.body,
  );
   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Update offered course successfully !',
      data: result,
    })
});

/* update offered course  */

const singleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.updateOfferedCourseFromDB(
    id,
    req.body,
  );
   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Retrieve single offered course successfully !',
      data: result,
    })
});



/* delete offered course */

const deleteOfferedCourse = catchAsync(async(req,res)=> {
  const {id} = req.params;
  const result = await offeredCourseServices.deleteOfferedCourseFromDB(id);
   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Delete offered course successfully !',
      data: result,
    })
})


/* get all offered course */

const getAllOfferedCourse = catchAsync(async(req,res)=>{
  const query = req.query;
  const result = await offeredCourseServices.retrieveAllOfferedCoursesFromDB(query)
   sendResponse(res, {
     success: true,
     statusCode: httpStatus.OK,
     message: 'Retrieve all offered course successfully !',
     meta: result?.meta,
     data: result.result,
   });
})


/* get my offered courses controller */


const getMyOfferedCourses = catchAsync(async(req,res) => {
  const userId = req.user.userId;
  console.log(userId)
  const result = await offeredCourseServices.getMyOfferedCourseFromDB(userId,req.query);
   sendResponse(res, {
     success: true,
     statusCode: httpStatus.OK,
     message: 'Retrieve my all offered course successfully !',
     meta:result.meta,
     data:result.result
   });
})



export const offeredCourseController = {
  createOfferedCourse,
  updateOfferedCourse,
  singleOfferedCourse,
  deleteOfferedCourse,
  getAllOfferedCourse,
  getMyOfferedCourses
};
