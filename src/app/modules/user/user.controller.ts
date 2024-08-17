import {  RequestHandler} from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createStudent:RequestHandler = async (req, res,next) =>{
  
    try {

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
      }  catch (err) {
        // res.status(500).json({
        //   success: false,
        //   message: err.message || 'something went wrong',
        //  //message: 'something went wrong',
        //   error: err,
        // });
        next(err)
      }
      };


      export const UserControllers={
    createStudent
}