export interface IErrorSources {
  path: string | number
  message: string
}





export interface IGenerateError {
  statusCode:number,
  message:string,
  errorSources:IErrorSources[],
  stack?:unknown
}