import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  try {
    console.log(req)

    res.status(200).json({ success: true, message: 'Data Successfully get tt' })
  } catch (error: any) {
    console.log(error.message)
  }
})

// Global Error Handling

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res
      .status(400)
      .json({ success: false, error: true, message: 'Something went wrong' })
  }
})

export default app
