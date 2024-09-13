import { model, Schema } from "mongoose";
import {   StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName} from "./student.interface";
//import validator from "validator";
//import bcrypt from "bcrypt";
//import config from "../../config";


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
    user:{
      type:Schema.Types.ObjectId,
      required:[true, 'user id is requires'],
      unique:true,
      ref:'User'
    },
    // password: {
    //   type: String,
    //   required: [true, 'Password is required'],
    //   maxlength: [20, 'Password can not be more than 20 characters'],
    // },
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
    dateOfBirth: { type: Date },
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
    admissionSemester:{
      type:Schema.Types.ObjectId,
      ref:'AcademicSemester'
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref:'AcademicDepartment',
    },
    // isActive: {
    //     type: String,
    //     enum: {
    //       values: ['active', 'blocked'],
    //       //message: '{VALUE} is not a valid status',
    //     },
    //     default: 'active',
    //   },
      isDeleted: {
        type: Boolean,
        default: false,
      },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);


    // virtual
studentSchema.virtual('fullName').get(function () {
  return ( `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}  `);
});

//     // pre save middleware/ hook : will work on create()  save()
// studentSchema.pre('save', async function (next) {
//   //console.log(this, 'pre hook : we will save  data');
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this; // doc
//   // hashing password and save into DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//  );
//   next();
// });

// // post save middleware / hook
// studentSchema.post('save', function (doc, next) {
//  // console.log(this, 'post hook : we will save  data');
//   doc.password = '';
//   next();
// });


   // Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

 studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
   next();
 });


 // [ {$match: { isDeleted : {  $ne: : true}}}   ,{ '$match': { id: '1234620' } } ]

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
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