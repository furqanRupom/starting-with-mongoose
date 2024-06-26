import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import router from './app/routes'

const app: Application = express()
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173',credentials:true }));
app.use(express.json())

//application  routes



app.use('/api/v1/', router)






app.get('/', (req: Request, res: Response) => {
  res.send('Mongo App is Working!')
})




// Global Error middleware
app.use(globalErrorHandler);


// not found
app.use(notFound);



export default app
