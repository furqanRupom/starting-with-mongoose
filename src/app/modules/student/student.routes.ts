import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

// define routes

router.get('/', StudentControllers.getAllStudentsController)
router.get('/:id', StudentControllers.getSingleStudentController)
router.delete('/:id', StudentControllers.deleteStudentController)
router.put('/:id',StudentControllers.updateStudentController)

export const studentRoutes = router
