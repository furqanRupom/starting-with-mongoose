import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";



const createCourse = catchAsync(async(req,res)=> {

  const result = await courseServices.createCourseIntoDB(req.body);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'course created successfully',
    data:result
  })
})


const getAllCourses = catchAsync(async(req,res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);

   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Retrieve all courses successfully',
     data: result.result,
     meta:result.meta
   });
})


const getSingleCourse = catchAsync(async(req,res) => {
  const {id} = req.params;

  const result = await courseServices.getSingleCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve  courses successfully',
    data: result,
  });
})


const  updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body
  const result = await courseServices.updateCourserFromDB(id,payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course update successfully',
    data: result,
  });
});





/* delete course  */

const deleteCourse = catchAsync(async(req,res)=>{
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete  course successfully',
    data: result,
  });
})


/* assign faculties into db */

const assignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const payload = req.body.data;
 
  const result = await courseServices.assignFacultiesIntoDB(courseId,payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create course faculty successfully',
    data: result,
  });
});


/* get and retrieve all assign faculties  */

const getAssignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await courseServices.getAllAssignFacultiesFromDB(courseId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Course faculty successfully',
    data: result,
  });
});






/* delete course faculties  */

const deleteCourseFaculties = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculties } = req.body;
  console.log(id,faculties)
  const result = await courseServices.deleteCourseFacultiesFromDB(
    id,
    faculties,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete  course faculty successfully',
    data: result,
  });
});



export  const courseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFaculties,
  deleteCourseFaculties,
  getAssignFaculties

}