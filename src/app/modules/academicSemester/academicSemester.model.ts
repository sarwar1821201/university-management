import { Schema } from "mongoose";
import { TAcademicSemester, TAcademicSemesterName, TAcademicSemesterCode } from './academicSemester.interface';


const acdemicSemesterSchema = new Schema<TAcademicSemester>(
    {
      name: {
        type: String,
        required: true,
        enum: TAcademicSemesterName,
      },
      year: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
        enum: TAcademicSemesterCode,
      },
      startMonth: {
        type: String,
        required: true,
        enum: Months,
      },
      endMonth: {
        type: String,
        required: true,
        enum: Months,
      },
    },
    {
      timestamps: true,
    },
  );