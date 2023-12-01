import express from "express"
import { academicDepartmentController } from "./academicDepartment.controller";
import validateRequest from "../../middleware/validateRequest";
import { academicDepartmentValidation } from "./acdemicDepartment.validation";


const router = express.Router();


router.post('/create-academic-department',validateRequest(academicDepartmentValidation.AcademicDepartmentSchemaValidation), academicDepartmentController.createAcademicDepartment);

router.get('/',academicDepartmentController.getAllAcademicDepartment);
router.get('/:id',academicDepartmentController.getSpecificAcademicDepartment);
router.patch('/:id', validateRequest(academicDepartmentValidation.AcademicDepartmentUpdateSchemaValidation), academicDepartmentController.updateSpecificAcademicDepartment)


export const academicDepartmentRouter = router;