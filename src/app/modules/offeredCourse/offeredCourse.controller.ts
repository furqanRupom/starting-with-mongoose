import catchAsync from "../../utils/catchAsync";
import { offeredCourseServices } from "./offeredCourse.service";



/* create offered course  */



const createOfferedCourse = catchAsync(async(req,res)=>{
  const result = await offeredCourseServices.createOfferedCourseIntoDB(req.body);
  return result;

})


export const offeredCourseController = {
  createOfferedCourse
}