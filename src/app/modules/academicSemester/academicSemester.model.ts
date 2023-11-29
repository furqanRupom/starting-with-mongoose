import { Schema, model } from 'mongoose'
import { IAcademicSemester } from './academicSemester.interface'

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: ['autumn', 'summer', 'fall'],
        message: '{VALUE} is not valid',
      },
    },
    code: {
      type: String,
      enum: {
        values: ['01', '02', '03'],
        message: '{VALUE} is not valid',
      },
    },
    startsMonth: {
      type: String,
      enum: [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
      ],
      required: true,
    },
    endMonth: {
      type: String,
      enum: [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const AcademicSemesterModel = model<IAcademicSemester>('academicSemester',AcademicSemesterSchema)