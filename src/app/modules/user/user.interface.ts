import { Model } from 'mongoose';

export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'student' | 'admin' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface IUserModel extends Model<IUser> {
  isUsersExitsByCustomId(id: string): Promise<IUser>;
  isPasswordMatched(userPassword:string,hashedPassword:string):Promise<Boolean>
}

