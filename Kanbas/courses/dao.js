

import model from "./model.js";
import mongoose from "mongoose";

export const getAllCourses =()=>model.find();




export const deleteCourse =(courseId)=>model.deleteOne({_id: new mongoose.Types.ObjectId(courseId)});

export const createCourse = (newCourse) => {
    //
    delete newCourse._id;
    //
    //console.log(JSON.stringify(newCourse));
    model.create(newCourse);
};

export const updateCourse= (courseId, course) => model.updateOne({ _id: courseId }, { $set: course });
    
       

export const findCourseById = (courseId) => model.findById(courseId);
