import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentJoiValidationSchema from "./student.joi.validation";


const createStudent = async (req: Request, res: Response) =>{
  
    try {
        const { student: studentData } = req.body;

       const {error}=studentJoiValidationSchema.validate(studentData);

         /// create student into the database
         const result = await StudentServices.createStudentIntoDB(studentData);

       if(error){
        res.status(500).json({
            success: false,
          message: 'something went wrong',
          error: error.details,
          });
       }


        res.status(200).json({
          success: true,
          message: 'Student is created successfully',
          data: result,
        });
      }  catch (err) {
        res.status(500).json({
          success: false,
        //   message: err.message || 'something went wrong',
        message: 'something went wrong',
          error: err,
        });
      }
      };

const getAllStudents = async (req: Request, res: Response) => {
    try {
      const result = await StudentServices.getAllStudentsFromDB();
  
      res.status(200).json({
        success: true,
        message: 'Students are retrieved successfully',
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  const getSingleStudent = async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
  
      const result = await StudentServices.getSingleStudentFromDB(studentId);
  
      res.status(200).json({
        success: true,
        message: 'Student is retrieved successfully',
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };



export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
  };