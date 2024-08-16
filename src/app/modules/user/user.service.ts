import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import {  TUser } from "./user.interface";
//import { Student } from "../student/student.model";
import { User } from "./user.model";


const createStudentIntoDB = async ( password:string,studentData: TStudent) => {
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

       // set manually generated id
    userData.id='203010001'

        // create user

        const newUser=  await User.create(userData)
      // const result=await student.save()

         // create a student
      if(Object.keys(newUser).length){
        // set id, _id as user
        studentData.id=newUser.id;
        studentData.user=newUser._id;  //reference id
     
        const newStudent=await Student.create(studentData)
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