{/*API for course data */}
import Database from "../Database/index.js";
export default function CourseRoutes(app) {
    app.get("/api/courses", (req, res)=>{
        const courses = Database.courses;
        res.send(courses);
    });

    app.post("/api/courses", (req,res)=>{
        const course = {...req.body, _id:new Date().getTime().toString()};
        Database.courses.push(course);
        res.send(course);
    });
    app.delete("/api/courses/:id",(req,res)=>{
        const {id} = req.params;
        Database.courses = Database.courses.filter((x)=>x.id !== id);
        res.sendStatus(204);
    });






}
