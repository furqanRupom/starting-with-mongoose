import { Schema, model } from 'mongoose'
import { IAcademicSemester} from './academicSemester.interface'
import { academicSemesterCode, academicSemesterName, months } from './academicSemester.constant'




const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: academicSemesterName,
        message: '{VALUE} is not valid',
      },
    },
    year : {
     type:String,
     required:true
    },
    code: {
      type: String,
      enum: {
        values: academicSemesterCode,
        message: '{VALUE} is not valid',
      },
    },
    startsMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum:months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)





/*
Pre document  : we were checking that current document is valid or not   */


AcademicSemesterSchema.pre('save',async function(next){
  const isAcademicSemesterExits = await AcademicSemesterModel.findOne({
    name:this.name,
    year:this.year
  })

  if(isAcademicSemesterExits){
    throw new Error('This semester is already exits !');
  }

  next();

})

export const AcademicSemesterModel = model<IAcademicSemester>('academicSemester',AcademicSemesterSchema)