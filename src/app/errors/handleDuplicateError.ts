import mongoose from 'mongoose'
import { IErrorSources, IGenerateError } from '../interface/error'

export const handleDuplicateError = (
  error: mongoose.Error.OverwriteModelError,
) => {
  const match = error.message.match(/"([^"]*)"/)
  const extractedMessage = match && match[0]

  const errorSources: IErrorSources[] = [
    {
      path: '',
      message: `${extractedMessage}  is Already Exits !`,
    },
  ]
  const statusCode = 400

  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  }
}
