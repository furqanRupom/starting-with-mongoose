import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import config from "../config";
const auth = () => {
  catchAsync(async(req,res,next)=>{
    const token  = req.headers.authorization;


    if(!token){
      throw new AppError(httpStatus.UNAUTHORIZED,"You're not not authorized !")
    }


    /* validate access token  */

    jwt.verify(token,config.jwt_secret_token as string,function(error,decode){
         if(error){
          throw new AppError(httpStatus.UNAUTHORIZED,"Access denied.Unauthorized authentication !")
         }

         console.log(decode);
    })





    next();
  })
}

export default auth;