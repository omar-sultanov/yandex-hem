import dotenv from 'dotenv';
// Load correct settings before any other input for correct initialization
dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});
const { MongoClient } = require('mongodb');
import express, { Application } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookies from 'cookie-parser';
import axios from 'axios';

const methodOverride = require('method-override');
import cors from 'cors';
const fileUpload = require('express-fileupload');
const { urlencoded, json } = require('express');
const app: Application = express();
const port = process.env.PORT ?? 80;
const apiRouter = require('./routes/api');
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(cookies());
const mongoose = require('mongoose');
app.use('/yandex', apiRouter);

//Middlewares
app.use(express.static('public'));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  }),
);

//Connect DB
mongoose
  .connect(
    'mongodb://localhost:27017',
    // 'mongodb+srv://omarsultanov98:TqAqC8mpaufksULM@cluster0.25clljj.mongodb.net/?retryWrites=true&w=majority/hem',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() =>
    console.log('-------------------------------Database connected!-------------------------'),
  )
  .catch((err) => console.log(err));
//in here

app.listen(port, () => {
  console.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
