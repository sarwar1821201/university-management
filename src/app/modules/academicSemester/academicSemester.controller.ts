
/* eslint-disable @typescript-eslint/no-unused-vars */
import {  RequestHandler} from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";


const createAcademicSemester = catchAsync( async (req, res,next) =>{
  
 // const { password, student: studentData } = req.body;

   const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

  sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Academic Semester is created successfully',
      data:result
  })
  
}  )  ;


      export const AcademicSemesterControllers={
         createAcademicSemester
}