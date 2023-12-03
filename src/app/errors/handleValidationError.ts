import mongoose from 'mongoose'
import { IErrorSources } from '../interface/error'

export const handleValidationError = (
  error: mongoose.Error.ValidationError,
) => {
  const errorSources: IErrorSources[] = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}
