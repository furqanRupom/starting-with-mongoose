import { Model, Types } from "mongoose";

export interface IFacultyName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export interface IFaculty {
  id:string;
  user:Types.ObjectId;
  name: IFacultyName;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'others';
  designation: string;
  dateOfBirth:string;
  bloodGroup:TBloodGroup;
  presentAddress:string;
  permanentAddress:string;
  profileImage?:string;
  academicDepartment:Types.ObjectId;
  academicFaculty:Types.ObjectId;
  isDeleted:boolean;
}


export interface IFacultyModal extends Model<IFaculty>{
 isUserExits(id:string):Promise<IFaculty|null>
}

