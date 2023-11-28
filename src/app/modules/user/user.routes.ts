import express from "express"
import { userController } from "./user.controller";


const router = express.Router();



router.post('/create-student',userController.createStudentController)
router.post('/create-admin')
router.post('/create-faculty')






export const userRoutes = router;