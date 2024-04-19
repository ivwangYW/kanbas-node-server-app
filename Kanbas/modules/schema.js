import mongoose from "mongoose";


const moduleSchema = new mongoose.Schema({

name: { type: String, required: true, unique: true },
description: { type: String, required: true },
course: String,
lessons:  {
_id: String,
name: String,
description: String,
module: String,},
},
{ collection: "modules" });
export default moduleSchema;  

