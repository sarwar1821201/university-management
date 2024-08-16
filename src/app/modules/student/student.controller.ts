import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
//import studentZodValidationSchema from "./student.zod.validation";
//import studentZodValidationSchema from "./student.zod.validation";
//import studentJoiValidationSchema from "./student.joi.validation";


// const createStudent = async (req: Request, res: Response) =>{
  
//     try {
//         const { student: studentData } = req.body;

//     //    const {error,value}=studentJoiValidationSchema.validate(studentData);

//          /// create student into the database

     
//           /// data validation with zod
//           const zodParsedData = studentZodValidationSchema.parse(studentData);

//          const result = await StudentServices.createStudentIntoDB(zodParsedData);

      

//         res.status(200).json({
//           success: true,
//           message: 'Student is created successfully',
//           data: result,
//         });
//       }  catch (err:any) {
//         res.status(500).json({
//           success: false,
//           message: err.message || 'something went wrong',
//          //message: 'something went wrong',
//           error: err,
//         });
//       }
//       };

const getAllStudents = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const result = await StudentServices.getAllStudentsFromDB();

      sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Student is retrieved successfully',
        data:result
    })
  
      // res.status(200).json({
      //   success: true,
      //   message: 'Students are retrieved successfully',
      //   data: result,
      // });
    } catch (err) {
      // res.status(500).json({
      //   success: false,
      //   message: err.message || 'something went wrong',
      //   error: err,
      // });
      next(err)
    }
  };
  
  const getSingleStudent = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const { studentId } = req.params;
  
      const result = await StudentServices.getSingleStudentFromDB(studentId);
  
      res.status(200).json({
        success: true,
        message: 'Student is retrieved successfully',
        data: result,
      });
    } catch (err) {
      // res.status(500).json({
      //   success: false,
      //   message: err.message || 'something went wrong',
      //   error: err,
      // });
      next(err)
    }
  };

  const deleteStudent = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const { studentId } = req.params;
  
      const result = await StudentServices.deleteStudentFromDB(studentId);
  
      res.status(200).json({
        success: true,
        message: 'Student is deleted successfully',
        data: result,
      });
    } catch (err) {
      // res.status(500).json({
      //   success: false,
      //   message: err.message || 'something went wrong',
      //   error: err,
      // });
      next(err)
    }
  };



export const StudentControllers = {
   // createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent
  };