import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import config from '../config'
import { handleZodError } from '../errors/handleZodError'
import { IErrorSources } from '../interface/error'
import { handleValidationError } from '../errors/handleValidationError'
import { handleCastError } from '../errors/handleCastError'
import { handleDuplicateError } from '../errors/handleDuplicateError'
import AppError from '../errors/AppError'

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

    /* zod Error */

    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources

    /* Validation  Error */
  } else if (error?.name === 'validationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  } else if (error?.name === 'castError') {

    /* Cast  Error */

    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  } else if (error?.code === 11000) {

    /* Duplicate   Error */

    const simplifiedError = handleDuplicateError(error)
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;

  }else if (error instanceof AppError){
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [{
      path:'',
      message:error?.message
    }]
  }

  return res
    .status(statusCode)
    .json({ success: false, message, errorSources, stack: error?.stack })
}



export default globalErrorHandler
