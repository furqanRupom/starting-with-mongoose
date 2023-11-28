import app from './app'
import mongoose from 'mongoose'
import config from './app/config'

/*

We all do necessary things expect main operation in express . It means we can do database connectivity and some other stuffs which is not include in any operation in express routing etc..

*/

const main = async () => {
  try {
    const connect = await mongoose.connect(config.database_url as string)
    if (connect) {
      console.log('successfully connected')
    }
    app.listen(config.port, () => {
      console.log(`This Mongoose App is running on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
