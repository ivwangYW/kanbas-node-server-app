

import model from "./model.js";
import mongoose from "mongoose";

export const getAllCourses =async()=>{
    const documents = await model.find();
    
    //convert all _id to string type instead of some string some ObjectId.
    const transformedDocuments = documents.map(doc => {
        const document = doc.toObject(); // Convert Mongoose document to plain object
        document._id = document._id.toString(); // Convert ObjectId to string
        return document;
    });
    return transformedDocuments;

};




export const deleteCourse =async (courseId)=> await model.deleteOne({_id: courseId});

export const createCourse = async (newCourse) => {
    //
    //delete newCourse._id;
    //
    //console.log(JSON.stringify(newCourse));
    await model.create(newCourse);
};

export const updateCourse= async(courseId, course) => await model.updateOne({ _id: courseId }, { $set: course });
    
       

export const findCourseById = async (courseId) => await model.findById(courseId);
