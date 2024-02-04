import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { enrolledCoursesServices } from "./enrolledCourses.service";
import sendResponse from "../../utils/sendResponse";





/* retrieve all enrolled courses */

const retrieveEnrolledCourses = catchAsync(async(req,res) => {
   const userId = req.user.userId;
   const result = await enrolledCoursesServices.retrieveMyEnrolledCoursesFromDB(userId,req.query)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'retrieve my enrolled successfully !',
      meta:result.meta,
      data: result.result,
    });
})


/* create enrolled course */


const createEnrolledCourse = catchAsync(async(req,res)=>{
  const payload = req.body;
  const userId = req.user.userId;


  const result = await enrolledCoursesServices.createdEnrolledCoursesIntoDB(userId,payload)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'create enrolled course successfully !',
      data: result,
    });
})



const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await enrolledCoursesServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks is updated successfully',
    data: result,
  });
});


export const enrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  retrieveEnrolledCourses
}