{/*API for course data */}
import courses from "../Database/courses.js";
import Database from "../Database/index.js";
import * as dao from "./dao.js";
export default function CourseRoutes(app) {
    app.get("/api/courses", async(req, res)=>{
        const courses = await dao.getAllCourses();
        res.send(courses);
    });
    //add new course
    app.post("/api/courses", async(req,res)=>{
        console.log("adding new course in routes.js server");
        const course = {...req.body, _id:new Date().getTime().toString()};
        dao.createCourse(course); //Database.courses.push(course);
        res.send(course);
    });
    app.delete("/api/courses/:id",async (req,res)=>{
        //console.log("trying to delete");
        const {id} = req.params;
        console.log(typeof id);//string
        await dao.deleteCourse(id);
        //Database.courses = Database.courses.filter((x)=>x.id !== id);
        res.sendStatus(204);
    });
    //update course
    app.put("/api/courses/:id", async (req,res)=>{
        const{id}=req.params;
        const course = req.body;

        //const foundcourseIdDB = await dao.findCourseById(parseInt(id)); //Database.courses = Database.courses.map((x)=> x._id === parseInt(id) ? {...x, ...course}: x);
        dao.updateCourse(parseInt(id),course);
        res.sendStatus(204);
    })


    //find course by id
    app.get("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        //const courses = dao.getAllCourses();
        
        const course = await dao.findCourseById(id)  // find((c) => c._id === id))
        
        if (!course) {
        res.status(404).send("Course not found");
        return;
        }
        res.send(course);
        });

}
