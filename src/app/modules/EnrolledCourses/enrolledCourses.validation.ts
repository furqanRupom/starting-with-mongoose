import { z } from 'zod';
import { gradeSchema } from './enrolledCourses.constant';



const enrolledCoursesValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});


const updateEnrolledCourseMarksValidationZodSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
    courseMarks: z.object({
      classTest1: z.number().optional(),
      midTerm: z.number().optional(),
      classTest2: z.number().optional(),
      finalTerm: z.number().optional(),
    }),
  }),
});

export const enrolledCoursesValidations = {
  enrolledCoursesValidationSchema,
  updateEnrolledCourseMarksValidationZodSchema
};
