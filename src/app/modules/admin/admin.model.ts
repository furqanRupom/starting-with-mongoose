import { Schema, model } from 'mongoose';
import validator from 'validator';
import { IAdmin, IAdminModal, IAdminName } from './admin.interface';

const AdminNameModal = new Schema<IAdminName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const adminSchema = new Schema<IAdmin>({
  id: {
    type: String,
    required: true,
  },
  user: Schema.ObjectId,
  name: AdminNameModal,
  gender: {
    type: String,
    enum: {
      values: ['female', 'male', 'others'],
      message: '{VALUE} is not valid !',
    },
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: false,
  },
  contactNumber: {
    type: String,
    required: [true, 'contact number is required !'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'emergency number is required !'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid a email',
    },
  },

  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    required: [true, 'Blood group is required !'],
  },
  presentAddress: {
    type: String,
    required: [true, 'present address is required !'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanent is required !'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

adminSchema.pre('find', async function (next) {
  await this.model.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { $ne: { isDeleted: true } } });
  next();
});

adminSchema.statics.isUserExits = async function (id: string) {
  const userExits = await AdminModal.findById(id);
  return userExits;
};

export const AdminModal = model<IAdmin, IAdminModal>('Admin', adminSchema);
