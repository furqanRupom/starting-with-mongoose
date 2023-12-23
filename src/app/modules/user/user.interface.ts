import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  id: string;
  password: string;
  email:string;
  needsPasswordChange: boolean;
  passwordChangeAt?:Date,
  role: 'student' | 'admin' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface IUserModel extends Model<IUser> {
  isUsersExitsByCustomId(id: string): Promise<IUser>;

  isPasswordMatched(userPassword:string,hashedPassword:string):Promise<Boolean>,

  isJwtIssuedBeforePasswordChanged(passwordChangeTimeStamp:Date,jwtIssuedTimeStamp:number):Boolean
}


export type  IUserType = keyof typeof USER_ROLE
