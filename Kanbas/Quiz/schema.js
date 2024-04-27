import mongoose from "mongoose";


const quizSchema = new mongoose.Schema({
_id: { type:String, required: false },
name: { type: String, required: true, unique: false },
description: { type: String, required: true },
course: String,
module: String,
problems: {
_id: String,
name: String,
description: String,
options: [option], 
answer:String,
quizId:String},
dateDue: String,
dateStart: String,
numberOfQuestions:String,
points:String,
status:String,
quizType:String,
shuffleAnswers:Boolean,
timeLimit:Boolean,
timeLimitMinutes:String,
multipleAtempts: Boolean,
viewResponses:String,
showCorrectAnswers:String,
oneQuestionAtATime:String,
requireRespondusLockdown:String,
requiredToViewResults:String,
webCamRequired:String,
lockQuestionsAfterAnswering:String,
forWhichUser:String,
dateAvailableUntilDate:String,
timeAvailableUntilTime:String,
dateAvailableFromDate:String,
timeAvailableFromTime:String,
timeDue:String,
accessCode: String,


/*added properties:
, quizType:"Graded Quiz", shuffleAnswers:false, timeLimit: true, timeLimitMinutes:"20", multipleAtempts: false, 
viewResponses: "Always", showCorrectAnswers:"Immediately", oneQuestionAtATime:"Yes", requireRespondusLockdown:"No", 
requiredToViewResults:"No", webCamRequired:"No", lockQuestionsAfterAnswering:"No", forWhichUser:"Everyone", dateAvailableUntilDate:"Sep 21" ,
timeAvailableUntilTime:"1pm" , dateAvailableFromDate:"Sep 21", timeAvailableFromTime:"12pm", timeDue:"1pm", accessCode:""
*/






},
{ collection: "quizes" });
export default quizSchema;  

