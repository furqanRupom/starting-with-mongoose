import { Schema, model } from 'mongoose';
import { iSemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<iSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: {
        values: ['UPCOMING', 'ONGOING', 'ENDED'],
        message: '{VALUE} is not valid',
      },
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      required: true,
    },
    maxCredit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const SemesterRegistrationModel = model<iSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
