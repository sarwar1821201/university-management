/* eslint-disable @typescript-eslint/no-unused-vars */
import {  RequestHandler} from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


const createStudent = catchAsync( async (req, res,next) =>{
  
    

  const { password, student: studentData } = req.body;

//    const {error,value}=studentJoiValidationSchema.validate(studentData);

   /// create student into the database

    /// data validation with zod
   // const zodParsedData = studentZodValidationSchema.parse(studentData);

   const result = await UserServices.createStudentIntoDB(password,studentData);

  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // });
  sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Student is created successfully',
      data:result
  })
  
}  )  ;


const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});


      export const UserControllers={
    createStudent,
    createFaculty,
    createAdmin
}