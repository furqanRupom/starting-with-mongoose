import express from 'express'
import { studentRoutes } from '../modules/student/student.routes'
import { userRoutes } from '../modules/user/user.routes'
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes'
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.routes'
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.routes'
import { facultyRoutes } from '../modules/faculty/faculty.routes'
import { adminRoutes } from '../modules/admin/admin.routes'
import { courseRoutes } from '../modules/course/course.routes'
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes'
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.routes'
import { authRoutes } from '../modules/auth/auth..routes'

const router = express.Router()

const modulesRoutes = [
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoutes,
  },
  {
    path:"/offered-course",
    route:offeredCourseRoutes
  },
  {
    path:"/auth",
    route:authRoutes
  }
];

modulesRoutes.forEach(({path,route}) => router.use(path,route))

export default router;
