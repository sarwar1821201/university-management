import { model, Schema } from "mongoose";
import {  StudentMethods, StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName} from "./student.interface";
//import validator from "validator";


const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
    middleName: {
      type: String,
      trim:true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required'],
        maxlength: [20, 'Name can not be more than 20 characters'],
        // validate:{
        //     validator:(value:string)=> validator.isAlpha(value),
        //     message:'{VALUE} is not valid '
        // }
    },
  });
  
  const guardianSchema = new Schema<TGuardian>({
    fatherName: {
      type: String,
      trim: true,
      required: [true, 'Father Name is required'],
    },
    fatherOccupation: {
      type: String,
      trim: true,
      required: [true, 'Father occupation is required'],
    },
    fatherContactNo: {
      type: String,
      required: [true, 'Father Contact No is required'],
    },
    motherName: {
      type: String,
      required: [true, 'Mother Name is required'],
    },
    motherOccupation: {
      type: String,
      required: [true, 'Mother occupation is required'],
    },
    motherContactNo: {
      type: String,
      required: [true, 'Mother Contact No is required'],
    },
  });
  
  const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    occupation: {
      type: String,
      required: [true, 'Occupation is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
  });
  
  const studentSchema = new Schema<TStudent,StudentModel>({
    id: { type: String, required: [true, 'ID is required'], unique: true },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required'],
      },
    gender: {
        type: String,
        enum: {
          values: ['male', 'female', 'other'],
          message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
      },
    dateOfBirth: { type: String },
    email: { 
        type: String, required: true,
        unique:true,
        // validate:{
        //     validator:(value:string)=> validator.isEmail(value),
        //     message:'{VALUE} is not valid '
        // }
     },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: {
          values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
          message: '{VALUE} is not a valid blood group',
        },
      },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required'],
      },
      localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required'],
      },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: {
          values: ['active', 'blocked'],
          //message: '{VALUE} is not a valid status',
        },
        default: 'active',
      },
  });


  //creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

  //creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };


  // create model
  export const Student = model<TStudent,StudentModel>('Student', studentSchema);