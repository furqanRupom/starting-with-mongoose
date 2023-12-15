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


const getAllCourses = catchAsync(async(req,res)=> {
  const result = await courseServices.getAllCoursesFromDB(req.query);

   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Retrieve all courses successfully',
     data: result,
   });
})


const getSingleCourse = catchAsync(async(req,res)=>{
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


const assignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const {faculties} = req.body;
  const result = await courseServices.assignFacultiesIntoDB(courseId,faculties)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'crete course faculty successfully',
    data: result,
  });
});


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
  deleteCourseFaculties

}