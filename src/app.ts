import express, { Application, Request, Response } from 'express';
import cors from 'cors';
//const express = require('express')
const app:Application = express()
//const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

app.get('/', (req:Request, res:Response) => {
    const a =10;
    res.send(a);
  //res.send('Hello World!')
})
  //console.log(process.cwd());

  export default app;