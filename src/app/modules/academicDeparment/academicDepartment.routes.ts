import express from "express"
import { academicDepartmentController } from "./academicDepartment.controller";


const router = express.Router();


router.post('/create-academic-department', academicDepartmentController.createAcademicDepartment);

router.get('/',academicDepartmentController.getAllAcademicDepartment);
router.get('/:id',academicDepartmentController.getSpecificAcademicDepartment);
router.patch('/:id',academicDepartmentController.updateSpecificAcademicDepartment)


export const academicDepartmentRouter = router;