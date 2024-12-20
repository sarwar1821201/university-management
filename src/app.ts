/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import { NextFunction } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
//const express = require('express')
const app:Application = express()
//const port = 3000;

//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser())
 
 // application routes
   app.use('/api/v1',router)
   //app.use('/api/v1',UserRoutes)
   

   const test = async (req: Request, res: Response) => {
    const a = 10;
    res.send(a);
  };
  
  app.get('/', test);

  app.use(globalErrorHandler )

   //not found
   app.use(notFound)

  export default app;