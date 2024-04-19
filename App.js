//const express = require('express')                // equivalent to import
import express  from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import session from "express-session";      // import new server session library
import "dotenv/config";//import package to use addresses defined in .env

const DATABASE_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect( DATABASE_CONNECTION_STRING);
const app = express();  // create new express instance
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}
));   //app.use(express.json());
app.use(express.json());   //Configure JSON HTTP body parsing FIRST. Make sure that this appears after the app.use(cors());                          
//configure server session after cors
//this is a default session configuration that works fine locally, but needs to be tweaked further to work in a remote server.
const sessionOptions = {          
    secret:process.env.SESSION_SECRET,    //default session options
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));
Lab5(app);
Hello(app); 
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);


app.listen(process.env.PORT || 4000);// listen to the environment variable called PORT for deployment to remote server, or use the local port http://localhost:4000 when running locally. 
