
import * as dao from "./dao.js";
function QuizRoutes(app) {

    app.get("/api/quizes/:cid", async(req,res)=>{

        console.log("test routes.js - get");
        const {cid} = req.params;
        let quizes = await dao.findAllQuizes();

        if(!quizes){
            res.status(400).send("no quiz found for the course");
            return;

        }
        
        quizes = quizes.filter((quiz)=>quiz.course.toString() === cid);
        res.send(quizes);
    });

    app.post("/api/quizes/:cid", async(req, res)=>{
        if(!req.body){
            res.status(500).send("provided empty new quiz when adding");
        }
        
        const {cid} = req.params;
        const newQuiz = {
            ...req.body, 
            course: cid,
            _id:new Date().getTime().toString()
        };
        let addedQuizToDB = await dao.addQuiz(newQuiz);
        console.log(`returned from db :${JSON.stringify(addedQuizToDB)}`);
        res.send(addedQuizToDB);
    });

    app.delete("/api/quizes/:quizId", (req, res)=>{
        console.log("entered route-delete");
        const {quizId} = req.params;
            //console.log(` quizId is: ${quizId}`);
            dao.deleteQuiz(quizId);//Database.modules = Database.modules.filter((m)=>m._id!== mid);
            res.sendStatus(200);
        
    }
    );



}

export default QuizRoutes; 