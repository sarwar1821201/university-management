/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import config from "../../config";
//import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import {  TUser } from "./user.interface";
//import { Student } from "../student/student.model";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";


const createStudentIntoDB = async ( password:string,payLoad: TStudent) => {
    //   const student=new Student(studentData)
  
    // if (await Student.isUserExists(studentData.id)) {
    //   throw new Error('User already exists!');
    // }

      // crate a user object
      const userData: Partial<TUser>={}
   // const userData  ={}


      // if password is not given, use default password
      userData.password=password || config.default_password as string ;

          // set student role
     userData.role='student'

      // find academic semester info
 // const admissionSemester = await AcademicSemester.findById( payLoad.admissionSemester);
  const admissionSemester = await AcademicSemester.findById(
   payLoad.admissionSemester,
 );


  const session = await mongoose.startSession();

     try{
        session.startTransaction();
         // set manually generated id
   // userData.id='203010001'
   //userData.id= await generateStudentId(admissionSemester)
   userData.id = await generateStudentId(admissionSemester);

   // create user

   // create a user (transaction-1)
   const newUser=  await User.create([userData],{session})
 // const result=await student.save()

    // create a student
 if(!newUser.length){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
 }

   // set id , _id as user
   payLoad.id = newUser[0].id;
   payLoad.user = newUser[0]._id; //reference _id

   // create a student (transaction-2)
   const newStudent = await Student.create([payLoad], { session });

   if (!newStudent.length) {
     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
   }

   await session.commitTransaction();
    await session.endSession();
 
   return newStudent;



     }  catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
      }
    
    };


// const createStudentIntoDB = async (studentData: TStudent) => {
//     //   const student=new Student(studentData)
  
//     if (await Student.isUserExists(studentData.id)) {
//       throw new Error('User already exists!');
//     }
//       const result = await Student.create(studentData);
//       // const result=await student.save()
      
//       return result;
//     };

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
   // create a user object
   const userData: Partial<TUser> = {};
 
   //if password is not given , use deafult password
   userData.password = password || (config.default_password as string);
 
   //set student role
   userData.role = 'faculty';
 
   // find academic department info
   const academicDepartment = await AcademicDepartment.findById(
     payload.academicDepartment,
   );
 
   if (!academicDepartment) {
     throw new AppError(400, 'Academic department not found');
   }
 
   const session = await mongoose.startSession();
 
   try {
     session.startTransaction();
     //set  generated id
     userData.id = await generateFacultyId();
 
     // create a user (transaction-1)
     const newUser = await User.create([userData], { session }); // array
 
     //create a faculty
     if (!newUser.length) {
       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
     }
     // set id , _id as user
     payload.id = newUser[0].id;
     payload.user = newUser[0]._id; //reference _id
 
     // create a faculty (transaction-2)
 
     const newFaculty = await Faculty.create([payload], { session });
 
     if (!newFaculty.length) {
       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
     }
 
     await session.commitTransaction();
     await session.endSession();
 
     return newFaculty;
   } catch (err: any) {
     await session.abortTransaction();
     await session.endSession();
     throw new Error(err);
   }
 };


    export const UserServices={
        createStudentIntoDB
     }