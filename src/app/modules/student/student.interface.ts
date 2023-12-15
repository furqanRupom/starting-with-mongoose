import { Model, Types } from 'mongoose'

export interface IGuardian {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
export interface IUserName {
  firstName: string
  middleName?: string
  lastName: string
}

export interface ILocalGuardian {
  name: string
  occupation: string
  contactNo: string
}

export interface IStudent {
  id: string
  user:Types.ObjectId
  password: string
  name: IUserName
  gender: 'male' | 'female' | 'others'
  school: string
  email: string
  dateOFBirth?: Date
  contactNumber: string
  emergencyContactNo: string
  bloodGroup?: 'O+' | 'O-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'A+' | 'A-'
  presentAddress: string
  permanentAddress: string
  guardian: IGuardian
  localGuardian: ILocalGuardian
  profileImage?: string,
  admissionSemester:Types.ObjectId
  academicDepartment:Types.ObjectId
  isDeleted: boolean
}

// statics methods

export interface TStudentModel extends Model<IStudent> {
  isStudentsExits(id: string): Promise<IStudent | null>
}




