import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { IUserType } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';

/* define custom request interface for attaching new property in request  */
interface customRequest extends Request {
  user: JwtPayload;
}

const auth = (...requiredRoles: IUserType[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You're not not authorized !",
      );
    }

    /* validate access token  */
    const decoded = jwt.verify(token, config.jwt_secret_token as string) as JwtPayload;



        const {role ,userId,iat} = decoded;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Access denied.Unauthorized authentication !',
          );
        }

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

         if(user.passwordChangeAt && UserModel.isJwtIssuedBeforePasswordChanged(user.passwordChangeAt,iat as number)){
          throw new AppError(httpStatus.UNAUTHORIZED, 'Access denied Invalid Authorization !');
         }


        //  const {userId:string,role} = decoded;
        //  console.log({userId,role});

        req.user = decoded as JwtPayload;
        next();


  });
};

export default auth;
