import express from 'express'
import { studentRoutes } from '../modules/student/student.routes'
import { userRoutes } from '../modules/user/user.routes'
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes'
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.routes'
import { academicDepartmentRouter } from '../modules/academicDeparment/academicDepartment.routes'

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
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path:'/academic-faculty',
    route:academicFacultyRouter
  },
  {
    path:'/academic-department',
    route:academicDepartmentRouter
  }
]

modulesRoutes.forEach(({path,route}) => router.use(path,route))

export default router
