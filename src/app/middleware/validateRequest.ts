/*

 1.  create middleware to check before the routes controller executed;
 2.  for validation we have to use higher order function;
*/

import { NextFunction,Request,Response } from "express"
import { AnyZodObject } from "zod"

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      })

      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export default validateRequest;
