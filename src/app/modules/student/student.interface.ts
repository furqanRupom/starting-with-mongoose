

interface Guardian {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
interface userName {
  firstName: string
  middleName: string
  lastName: string
}

interface LocalGuardian {
  name: string
  occupation: string
  contactNo: string
}

export interface Student {
  id:string
  name: userName
  gender: 'male' | 'female'
  school: string
  email: string
  dateOFBirth: string
  contactNumber: string
  emergencyContactNo: string
  bloodGroup?: 'O+' | 'O-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'A+' | 'A-'
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImage?:string
  isActive: "Active" | "inActive"
}
