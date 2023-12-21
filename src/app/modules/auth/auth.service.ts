import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from '../../config';

const loginUser = async (payload: ILoginUser) => {
  /* checking if the user exit  */

  const user = await UserModel.isUsersExitsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found !');
  }
  /* check that user is delete or not  */
  const isDeleted = user.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted !');
  }

  /* if the user is blocked or not  */

  const isBlocked = user.status;

  if (isBlocked === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'The User is blocked !');
  }

  /* check the password is matched or not  */

  const matchedPass = await UserModel.isPasswordMatched(
    payload.password,
    user.password,
  );

  if(!matchedPass){
     throw new AppError(httpStatus.BAD_REQUEST, 'wrong password !');
  }

  const jwtPayload = {
    userId:user,
    role:user.role
  }

  const accessToken =  jwt.sign(jwtPayload,config.jwt_secret_token as string,{
    expiresIn:'10d'
  })





  return {
   accessToken,
   needsPasswordChanges:user.needsPasswordChange
  };
}



export const authServices = {
  loginUser,
};
