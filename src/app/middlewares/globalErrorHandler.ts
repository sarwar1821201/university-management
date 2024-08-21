/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { TErrorSources } from "../errors/interface/error";


const globalErrorHandler: ErrorRequestHandler  =  (err,req, res,next)=>{
     //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];


    return res.status(statusCode).json({
        success:false,
        message,
        errorSources,
        error:err
    })

}

export default globalErrorHandler