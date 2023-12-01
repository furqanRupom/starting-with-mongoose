import { model, Schema } from 'mongoose'
import {
  TStudentModel,
  IGuardian,
  ILocalGuardian,
  IStudent,
  IUserName,
} from './student.interface'
import validator from 'validator'

// refactor schema

const studentNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'first name is required !'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const formatFirstName = value.charAt(0).toUpperCase() + value.slice(1)
        console.log(formatFirstName, value)
        return formatFirstName === value
      },
      message: '{VALUE} is not in capitalize Format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'last name is required !'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid!',
    },
  },
})

const guardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: [true, 'father name is required !'] },
  fatherOccupation: {
    type: String,
    required: [true, 'father occupation is required !'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'father contact no is required !'],
  },
  motherName: { type: String, required: [true, 'mother name is required !'] },
  motherOccupation: {
    type: String,
    required: [true, 'mother occupation is required !'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'mother contact no is required !'],
  },
})

const localGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
})

const studentSchema = new Schema<IStudent, TStudentModel>(
  {
    name: studentNameSchema,
    id: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id is required'],
      ref: 'User',
    },
    gender: {
      type: String,
      enum: {
        values: ['female', 'male', 'others'],
        message: '{VALUE} is not valid !',
      },
      required: true,
    },
    dateOFBirth: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid a email',
      },
    },
    contactNumber: {
      type: String,
      required: [true, 'contact number is required !'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'emergency number is required !'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
      required: [true, 'Blood group is required !'],
    },
    presentAddress: {
      type: String,
      required: [true, 'present address is required !'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'permanent is required !'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'guardian details  is required !'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'local guardian details is required !'],
    },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref:'academicSemesters'
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

/*  Mongoose Middleware and Hooks      */

//  Executes before when a document query is executed!

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// Executes after when document query  is executed|

//  Executes before when aggregate pipeline is executed!

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// Virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

/*
custom instance methods

* studentSchema.methods.isStudentsExits = async (id:string) => {
?  const existingStudent = await StudentModel.findOne({id})
?  return existingStudent
?}
*/

/* custom statics methods   */

studentSchema.statics.isStudentsExits = async (id: string) => {
  const existingStudent = await StudentModel.findOne({ id })
  return existingStudent
}

export const StudentModel = model<IStudent, TStudentModel>(
  'students',
  studentSchema,
)
