//const express = require('express')                // equivalent to import
import express  from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';
const app = express();  // create new express instance
app.use(cors());   //app.use(express.json());
app.use(express.json());   //Configure JSON HTTP body parsing FIRST. Make sure that this appears after the app.use(cors());                          
Lab5(app);
Hello(app); 
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);


app.listen(4000);// listen to the environment variable called PORT for deployment to remote server, or use the local port http://localhost:4000 when running locally. 
