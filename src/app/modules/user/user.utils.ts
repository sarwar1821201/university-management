import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

 
const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
      {
        role: 'student',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
  
    //203001   0001
    return lastStudent?.id ? lastStudent.id : undefined;
  };

/// year semester code 4digit code
export  const generateStudentId= async (payLoad:TAcademicSemester)=>{

    // first time 0000
    let currentId =  (0).toString();  // 0000  default id

    const lastStudentId = await findLastStudentId();

    // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  const currentSemesterCode = payLoad.code;
  const currentYear = payLoad.year;

  if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear ) {
    currentId = lastStudentId.substring(6); // 00001
  }

    let incrementId=(Number(currentId)+1).toString().padStart(4,'0');

    incrementId=`${payLoad.year}${payLoad.code}${incrementId}`

    return incrementId;

}


// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};
