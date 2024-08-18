import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";


const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    // semester name --> semester code
    // academicSemesterNameCodeMapper['Fall']

   
      if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
      throw new Error('Invalid Semester Code or timing');
    }
  
    const result = await AcademicSemester.create(payload);
    return result;
  };




  const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
  };

   
  const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
  };


  export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getSingleAcademicSemesterFromDB,
    getAllAcademicSemestersFromDB
  }