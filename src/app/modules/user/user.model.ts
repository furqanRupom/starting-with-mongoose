import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import config from '../../config'
import bcrypt from "bcryptjs"


const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required:true
    },
    needsPasswordChange: {
      type: Boolean,
      required: false,
      default:true,
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
      },
      default:'in-progress'
    },
    role: {
      type: String,
      enum: {
        values: ['student', 'admin', 'faculty'],
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// pre : Executed before a document is saved;

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  if (user?.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    )
  }
  next()
})

//  post : Executed after a document is saved;

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

export const UserModel = model<IUser>('user',userSchema)
