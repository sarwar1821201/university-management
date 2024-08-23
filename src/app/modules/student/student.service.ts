/* eslint-disable @typescript-eslint/no-unused-vars */
//import {  TStudent } from "./student.interface";
import mongoose from "mongoose";
import { Student,  } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";


// const createStudentIntoDB = async (studentData: TStudent) => {
//   //   const student=new Student(studentData)

//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('User already exists!');
//   }
//     const result = await Student.create(studentData);
//     // const result=await student.save()
    
//     return result;
//   };

  const getAllStudentsFromDB = async (query: Record<string,unknown> ) => {

     // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  : 
  //{ email: { $regex : query.searchTerm , $options: i}}
 // { presentAddress: { $regex : query.searchTerm , $options: i}}
 // { 'name.firstName': { $regex : query.searchTerm , $options: i}}

    let searchTerm = '';   // SET DEFAULT VALUE 

  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string ; 
  }

    const result = await Student.find({
      $or:['email', 'name.firstName','presentAddress' ].map((field)=> ({
        [field]:{$regex:searchTerm, $options:'i' }
      }) )
    }) .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
    return result;
  };
  
  const getSingleStudentFromDB = async (id: string) => {
   // const result = await Student.findOne({ id });
   const result = await Student.findOne({ id })
   .populate('admissionSemester')
   .populate({
     path: 'academicDepartment',
     populate: {
       path: 'academicFaculty',
     },
   });
    return result;
  };

   
  const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  
    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingStudentData,
    };
  
    /*
      guardain: {
        fatherOccupation:"Teacher"
      }
  
      guardian.fatherOccupation = Teacher
  
      name.firstName = 'Mezba'
      name.lastName = 'Abedin'
    */
  
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    }
  
    if (guardian && Object.keys(guardian).length) {
      for (const [key, value] of Object.entries(guardian)) {
        modifiedUpdatedData[`guardian.${key}`] = value;
      }
    }
  
    if (localGuardian && Object.keys(localGuardian).length) {
      for (const [key, value] of Object.entries(localGuardian)) {
        modifiedUpdatedData[`localGuardian.${key}`] = value;
      }
    }
  
    console.log(modifiedUpdatedData);
  
    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    });
    return result;
  };


  const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
  
      const deletedStudent = await Student.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session },
      );
  
      if (!deletedStudent) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
      }
  
      const deletedUser = await User.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session },
      );
  
      if (!deletedUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return deletedStudent;
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error('Failed to delete student');
    }
  
  };


  export const StudentServices = {
    //createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentIntoDB,
    deleteStudentFromDB
  };