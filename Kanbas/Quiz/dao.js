import model from "./model.js";


import mongoose from "mongoose";
import { ObjectId } from "mongoose";


export const findAllQuizes =async ()=>{

    try {
    const documents = await model.find();

    //convert all _id to string type instead of some string some ObjectId.
    const transformedDocuments = documents.map(doc => {
        const document = doc.toObject(); // Convert Mongoose document to plain object
        document._id = document._id.toString(); // Convert ObjectId to string
        return document;
    });
    return transformedDocuments;

    }
    catch (error) {
        console.log(error);

        return;
    }
};



export const addQuiz =async(newQuiz)=>{
    try{

    
    const createdQuiz = await model.create(newQuiz);
    //  log the created module
    console.log(`quiz created in database: ${JSON.stringify(createdQuiz)}`);
    return createdQuiz;

}
    catch(error) {
        console.log(error);
        return(error.response.data);
    }
}

export const deleteQuiz =async (quiz_id)=>await model.deleteOne({_id: quiz_id});


/******************************useless****************************** */


export const createQuiz = async (newQuiz) => {
    console.log(`newQuiz created in dao.js ${JSON.stringify(newQuiz)}`);
    //delete newQuiz._id;
    
    //
    //console.log(JSON.stringify(newCourse));
    const createdQuiz = await model.create(newQuiz);

    //  log the created module
    console.log(`Modulelol created in database: ${JSON.stringify(createdQuiz)}`);
    return createdQuiz;
};

export const updateQuiz= async (quiz_id, quiz) => {
    //if mid is not ObjectId type, convert it to ObjectId type
    
    await model.updateOne({ _id: quiz_id }, { $set: quiz});
    console.log("in dao.js - updateQuiz");
};
    
       

export const findQuizById = async (quiz_id) => await model.findById(quiz_id);
