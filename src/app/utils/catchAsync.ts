import { Request, Response, NextFunction, RequestHandler } from 'express'

/* higher order function : higher order function is a function that actually returns a function   */

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise
    .resolve(fn(req, res, next))
    .catch
    (error => next(error))
  }
}

export default catchAsync
