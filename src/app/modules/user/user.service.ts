import config from "../../config";
//import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import {  TUser } from "./user.interface";
//import { Student } from "../student/student.model";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";


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
  const admissionSemester = await AcademicSemester.findById( payLoad.admissionSemester);

    
       // set manually generated id
   // userData.id='203010001'
   //userData.id= await generateStudentId(admissionSemester)
   userData.id = await generateStudentId(admissionSemester);

        // create user

        const newUser=  await User.create(userData)
      // const result=await student.save()

         // create a student
      if(Object.keys(newUser).length){
        // set id, _id as user
        payLoad.id=newUser.id;
        payLoad.user=newUser._id;  //reference id
     
        const newStudent=await Student.create(payLoad)
       return newStudent;

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

    export const UserServices={
        createStudentIntoDB
     }