import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AdminModel } from '../admin/admin.model';
import { FacultyModel } from '../faculty/faculty.model';
import { UserModel } from './user.model';

const lastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  // 202203  => 0001
  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  /* 0001                     0000  */
  let currentId = (0).toString();

  const getLastStudentId = await lastStudentId();
  // 2022 01 0001

  const lastStudentYear = getLastStudentId?.substring(0, 4); // 2022
  const lastStudentSemesterCode = getLastStudentId?.substring(4, 6); // 01 | 02 | 03

  const currentCode = payload.code;
  const currentYear = payload.year;

  if (
    getLastStudentId &&
    lastStudentSemesterCode === currentCode &&
    lastStudentYear === currentYear
  ) {
    currentId = getLastStudentId.substring(6);
  }

  /* '000' 1+1 => padStart => '0002'    '000' 0 + 1 => '0001'  */
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

const lastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: -1 },
    { sort: { createdAt: -1 } },
  ).lean();
  console.log(lastFaculty);

  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();

  const lastFaculty = await lastFacultyId();
  console.log({ lastFaculty });

  if (lastFaculty) {
    currentId = lastFaculty.substring(2);
    console.log(currentId);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
};

const lastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
    {
      sort: { createdAt: -1 },
    },
  ).lean();

  return lastAdmin?.id ? lastAdmin?.id.substring(2) : undefined ;
};

export const generateAdminId = async () => {
    let currentId = (0).toString();

    const lastAdmin = await lastAdminId();
    console.log({ lastAdmin });

    if (lastAdmin) {
      currentId = lastAdmin.substring(2);
      console.log(currentId);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
};
