import mongoose from "mongoose";


const moduleSchema = new mongoose.Schema({
_id: { type:String, required: false },
name: { type: String, required: true, unique: false },
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

