/* eslint-disable @typescript-eslint/no-unused-vars */
import {  NextFunction, Request, RequestHandler, Response} from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
//import studentZodValidationSchema from "./student.zod.validation";
//import studentZodValidationSchema from "./student.zod.validation";
//import studentJoiValidationSchema from "./student.joi.validation";


// const createStudent = async (req: Request, res: Response) =>{
  
//     try {
//         const { student: studentData } = req.body;


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



const getAllStudents = catchAsync(async (req, res,next) => {
  
    const result = await StudentServices.getAllStudentsFromDB(req.query);

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
  // catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'something went wrong',
    //   error: err,
    // });
    //next(err)
 // }
})  ;
  
  const getSingleStudent :RequestHandler =  catchAsync( async (req, res,next) => {
    
      const { id } = req.params;
  
      const result = await StudentServices.getSingleStudentFromDB(id);

      sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Student is retrieved successfully',
        data:result
    });
  
  });

  const updateStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { student } = req.body;
    const result = await StudentServices.updateStudentIntoDB(id, student);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is updated successfully',
      data: result,
    });
  });

  const deleteStudent :RequestHandler = catchAsync (  async (req, res,next) => {
   // try {
      const { id } = req.params;
  
      const result = await StudentServices.deleteStudentFromDB(id);

      sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Student is deleted successfully',
        data:result
    });
  
  });



export const StudentControllers = {
   // createStudent,
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent
  };