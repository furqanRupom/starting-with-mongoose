import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import config from '../config'

/*

Our Error  pattern :

success:Boolean,
message:String,
errorSources:[
  path:'',
  message:''
]
*/

interface IErrorSources {
  path: string | number
  message: string
}[]

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

  /* zod Error */

  const handleZodError = (error: ZodError) => {
    const errorSources:IErrorSources[] = error.issues.map((issue) => {
      return {
        path:issue?.path[issue.path.length - 1],
        message:issue?.message
      }
    })
    const statusCode = 400;

    return {
      statusCode,
      success:false,
      message:'Zod Error',
      errorSources,
      stack:config.node_env === 'development' ? error?.stack : null
    }
  }


  if (error instanceof ZodError) {
    /* Simply Error */
    const simplifiedError = handleZodError(error)

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;


  }

  return res.status(statusCode).json({ success: false, message, errorSources ,stack:error?.stack})
}

export default globalErrorHandler
