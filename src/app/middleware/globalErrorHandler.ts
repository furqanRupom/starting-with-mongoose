import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import config from '../config'
import { handleZodError } from '../errors/handleZodError'
import { IErrorSources } from '../interface/error'
import { handleValidationError } from '../errors/handleValidationError'

/*

Our Error  pattern :

success:Boolean,
message:String,
errorSources:[
  path:'',
  message:''
]
*/



const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = 500
  let message: string = error.message || 'Something went wrong '

  let errorSources: IErrorSources[] = [
    { path: '', message: '' || 'Something went wrong' },
  ]



  if (error instanceof ZodError) {
    /* Simply Error */
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

  }else if (error?.name === 'validationError'){
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

  }

  return res.status(statusCode).json({ success: false, message, errorSources ,stack:error?.stack})
}

export default globalErrorHandler
