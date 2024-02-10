import { Response } from "express";

export interface IMeta {
  page?:number;
  limit?:number;
  total?:number
  totalPage?:number;
}

interface IResponse<T> {
  statusCode: number
  success: boolean
  message?: string
  meta?:IMeta
  data: T
}



const sendResponse =<T>(res:Response,data:IResponse<T>) => {
   return res.status(data?.statusCode).json({
    success:data?.success,
    message:data?.message,
    meta:data?.meta,
    data:data?.data
   })
}


export default sendResponse;