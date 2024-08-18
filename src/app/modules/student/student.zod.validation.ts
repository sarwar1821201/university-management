import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    ,
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

export const createStudentZodValidationSchema = z.object({
    body: z.object({
     // id: z.string().min(1),
      password: z.string().max(20),
      student:z.object({
        name: userNameValidationSchema,
        gender: z.enum(['male', 'female', 'other']),
      //gender:z.string().min(1).refine((value)=>['male', 'female', 'other'].includes(value),{message:'invalid gender'}),
        dateOfBirth: z.string().optional(),
        email: z.string().email(),
        contactNo: z.string().min(1),
        emergencyContactNo: z.string().min(1),
        bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
        //bloodGroup: z.string().refine( (value)=>['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(value),{message:'invalid blood group'}, ),
      
        presentAddress: z.string().min(1),
        permanentAddress: z.string().min(1),
        guardian: guardianValidationSchema,
        localGuardian: localGuardianValidationSchema,
        profileImg: z.string().optional(),
        admissionSemester: z.string(),
        //isActive: z.enum(['active', 'blocked']).default('active'),
        //isDeleted: z.boolean().optional().default(false),
      })
    })
});

export const studentValidations={
     createStudentZodValidationSchema
};