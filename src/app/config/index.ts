import dotenv from "dotenv"
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })


export default {
  node_env:process.env.NODE_ENV,
  database_url: process.env.MONGODB_URI,
  port: process.env.PORT,
  bcrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD
}

