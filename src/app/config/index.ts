import dotenv from "dotenv"
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })


export default {
  node_env: process.env.NODE_ENV,
  database_url: process.env.MONGODB_URI,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_secret_token: process.env.SECRET_ACCESS_TOKEN,
  jwt_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  jwt_secret_token_expire_date: process.env.ACCESS_TOKEN_EXPIRE_DATE,
  jwt_refresh_token_expire_date: process.env.REFRESH_TOKEN_EXPIRE_DATE,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
  super_admin_password:process.env.SUPER_ADMIN
};

