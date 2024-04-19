import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({

name: {  type: String, required: true, unique: false },
number: { type: String, required: false },
course: String,
startDate:  String,
endData: String,
image: String,
},
{ collection: "courses" });
export default courseSchema;  


