import { Schema, model } from 'mongoose';
import { IFaculty, IFacultyName,IFacultyModal } from './faculty.interface';
import validator from 'validator';

const FacultyNameModal = new Schema<IFacultyName>({
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

const facultySchema = new Schema<IFaculty>({
  id: {
    type: String,
    required: true,
  },
  user:Schema.ObjectId,
  name: FacultyNameModal,
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
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academicDepartment',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'academicSemester',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});



facultySchema.pre('find', async function(next){
   await this.model.find({isDeleted:{$ne:true}})
   next();
})

facultySchema.pre('findOne',function(next){
   this.find({isDeleted:{$ne:true}})
  next();
})

facultySchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match:{$ne:{isDeleted:true}}})
  next();
})


facultySchema.statics.isUserExits = async function (id:string){
  const userExits = await FacultyModal.findById(id);
  return userExits;
}

export const FacultyModal = model<IFaculty,IFacultyModal>('Faculty',facultySchema)