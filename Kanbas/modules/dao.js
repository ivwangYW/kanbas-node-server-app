

import model from "./model.js";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";


export const getAllModules =async ()=>{
    const documents = await model.find();

    //convert all _id to string type instead of some string some ObjectId.
    const transformedDocuments = documents.map(doc => {
        const document = doc.toObject(); // Convert Mongoose document to plain object
        document._id = document._id.toString(); // Convert ObjectId to string
        return document;
    });
    return transformedDocuments;
};




export const deleteModule =async (mid)=>await model.deleteOne({_id: mid});

export const createModule = async (newModule) => {
    console.log(`newModule created in dao.js ${JSON.stringify(newModule)}`);
    //delete newModule._id;
    
    //
    //console.log(JSON.stringify(newCourse));
    const createdModule = await model.create(newModule);

    //  log the created module
    console.log(`Modulelol created in database: ${JSON.stringify(createdModule)}`);
    return createdModule;
};

export const updateModule= async (mid, module) => {
    //if mid is not ObjectId type, convert it to ObjectId type
    
    await model.updateOne({ _id: mid }, { $set: module });
    console.log("in dao.js - updateModule");
};
    
       

export const findModuleById = async (mid) => await model.findById(new  mid);
