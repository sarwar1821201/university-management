
/* eslint-disable @typescript-eslint/no-unused-vars */
import {  RequestHandler} from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


const createAcademicSemester = catchAsync( async (req, res,next) =>{
  
 // const { password, student: studentData } = req.body;

 //  const result = await UserServices.createStudentIntoDB(password,studentData);

  sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Student is created successfully',
      data:result
  })
  
}  )  ;


      export const AcademicSemesterControllers={
         createAcademicSemester
}