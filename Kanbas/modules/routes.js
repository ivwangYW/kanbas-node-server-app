import Database from "../Database/index.js";
import modules from "../Database/modules.js";

function ModuleRoutes(app) {
    app.get("/api/courses/:cid/modules", (req,res)=>{
        const {cid}=req.params;
        const modules = Database.modules.filter((module)=>module.course === cid);
        if(!modules){
            res.status(400).send("no cid found for the course")
            return;

        }
        res.send(modules);
        
    }
    );
}
export default ModuleRoutes; 