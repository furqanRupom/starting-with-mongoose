/* zod Error */

import { ZodError } from "zod"
import config from "../config"
import { IErrorSources } from "../interface/error"

export const handleZodError = (error: ZodError) => {
  const errorSources: IErrorSources[] = error.issues.map(issue => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })
  const statusCode = 400

  return {
    statusCode,
    success: false,
    message: 'Zod Error',
    errorSources,
    stack: config.node_env === 'development' ? error?.stack : null,
  }
}
