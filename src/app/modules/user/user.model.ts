import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser, IUserModel>(
  {
    id: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      required: false,
      default: true,
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
      },
      default: 'in-progress',
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
);

// pre : Executed before a document is saved;

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user?.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

//  post : Executed after a document is saved;

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

/* statics methods  */


/* is user exit or not . make this  in statics methods */

userSchema.statics.isUsersExitsByCustomId = async function (id: string) {
  return await UserModel.findOne({ id });
};



/*  is password matched  */

userSchema.statics.isPasswordMatched = async function(userPassword:string,hashedPassword:string){
   const isMatched = await bcrypt.compare(userPassword,hashedPassword)
   return isMatched;
}

export const UserModel = model<IUser,IUserModel>('user', userSchema);
