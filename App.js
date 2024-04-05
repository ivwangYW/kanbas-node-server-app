//const express = require('express')                // equivalent to import
import express  from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
const app = express();  // create new express instance
app.use(express.json());
                           
Lab5(app);
Hello(app);

app.listen(4000);// listen to the environment variable called PORT for deployment to remote server, or use the local port http://localhost:4000 when running locally. 