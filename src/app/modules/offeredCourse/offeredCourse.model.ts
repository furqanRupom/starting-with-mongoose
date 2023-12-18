import { Schema, model } from "mongoose";
import { IOfferedCourse } from "./offeredCourse.interface";
import { DaysTypeModel } from "./offeredCourse.constant";



const daysEnum = {
  values: DaysTypeModel,
  message: '{VALUE} is not a valid day',
};

const offeredCourseSchema = new Schema<IOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [{
      type: String,
      enum: daysEnum,
    }],

    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);



export const OfferedCourseModel = model<IOfferedCourse>('offeredCourse',offeredCourseSchema);