import {z} from "zod"

const AcademicDepartmentSchemaValidation = z.object({
    body:z.object({
        name:z.string({
            invalid_type_error:'Academic Department name is required !'
        })
    })
})



export const academicDepartmentValidation = {
    AcademicDepartmentSchemaValidation
}