import mongoose from "mongoose";
import { IErrorSources, IGenerateError } from "../interface/error";



export const handleCastError = (error:mongoose.Error.CastError):IGenerateError => {
    const errorSources:IErrorSources[] = [{
        path:error.path,
        message:error.message
    }]

    const statusCode = 400;

    return {
        statusCode,
        message:'Cast Error !',
        errorSources
    }
}