import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from "jsonwebtoken";
import config from '../../config';
import { createToken } from './auth.utils';

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
    userId:user.id,
    role:user.role
  }

  const accessToken =  createToken(jwtPayload,config.jwt_secret_token as string,config.jwt_secret_token_expire_date as string)


    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_token as string,
      config.jwt_refresh_token_expire_date as string,
    );





  return {
   accessToken,
   refreshToken,
   needsPasswordChanges:user.needsPasswordChange
  };
}


const changePassword = async (userInfo:JwtPayload,payload:{oldPassword:string,newPassword:string}) => {

   const user = await UserModel.isUsersExitsByCustomId(userInfo.userId);

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
     payload.oldPassword,
     user.password,
   );

   if (!matchedPass) {
     throw new AppError(httpStatus.BAD_REQUEST, 'wrong password !');
   }

   /* hashed new password  */

   const hashedNewPassword = await bcrypt.hash(payload.newPassword,Number(config.bcrypt_salt_rounds))

 const result = await UserModel.findByIdAndUpdate({id:userInfo.userId},{
  password:hashedNewPassword,
  needsPasswordChange:false,
  passwordChangeAt:new Date()
 })
 if(!result){
    throw new AppError(httpStatus.NOT_FOUND, 'User not found  !');

 }

 return null
}




const refreshToken = async (token:string) => {


  /* validate access token  */
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;

  const {  userId, iat } = decoded;


  // console.log(decoded);

  const user = await UserModel.isUsersExitsByCustomId(userId);

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

  if (
    user.passwordChangeAt &&
    UserModel.isJwtIssuedBeforePasswordChanged(
      user.passwordChangeAt,
      iat as number,
    )
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Access denied Invalid Authorization !',
    );
  }

    const jwtPayload = {
      userId: user.id,
      role: user.role,
    };

    const secretToken = createToken(
      jwtPayload,
      config.jwt_secret_token as string,
      config.jwt_secret_token_expire_date as string,
    );

    return {
      secretToken
    }
}

export const authServices = {
  loginUser,
  changePassword,
  refreshToken
};
