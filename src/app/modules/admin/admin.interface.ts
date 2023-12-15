import { Model, Types } from 'mongoose';

export interface IAdminName {
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

export interface IAdmin {
  id: string;
  user: Types.ObjectId;
  name: IAdminName;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'others';
  designation: string;
  dateOfBirth: string;
  bloodGroup: TBloodGroup;
  contactNumber: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted: boolean;
}

// export interface IAdminModal extends Model<IAdmin> {
//   isUserExits(id: string): Promise<IAdmin | null>;
// }
