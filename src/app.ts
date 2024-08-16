import express, { Application, Request, Response } from 'express';
import cors from 'cors';
//import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
//const express = require('express')
const app:Application = express()
//const port = 3000;

//parsers
app.use(express.json());
app.use(cors());
 
 // application routes
   //app.use('/api/v1/students',StudentRoutes)
   app.use('/api/v1/users',UserRoutes)
   

app.get('/', (req:Request, res:Response) => {
    const a =10;
    res.send(a);
  //res.send('Hello World!')
})
  //console.log(process.cwd());

  export default app;