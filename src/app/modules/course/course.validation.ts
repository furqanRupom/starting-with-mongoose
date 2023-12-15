import { z } from "zod";

const prerequisiteCoursesSchemaValidation = z.object({
  course:z.string(),
  isDeleted:z.boolean().optional()
});

const createCourseValidationSchema = z.object({
  title: z.string(),
  prefix: z.string(),
  credit: z.number(),
  code: z.number(),
  isDeleted: z.boolean(),
  prerequisiteCourses:z.array(prerequisiteCoursesSchemaValidation).optional()
});

const updateCourseValidationSchema = createCourseValidationSchema.partial();

const courseFacultyValidation = z.object({
  faculties: z.array(z.string()),
});


export const courseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  courseFacultyValidation
}