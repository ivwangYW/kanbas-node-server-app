
import * as dao from "./dao.js";

function ModuleRoutes(app) {
     //get all modules
    app.get("/api/courses/:cid/modules", async(req,res)=>{
        console.log("getting modules~~");
        const {cid}=req.params;
        let modules = await dao.getAllModules();
        console.log(`modules complete received from db:${modules}` );
        modules = modules.filter((module)=>module.course.toString() === cid);
        if(!modules){
            res.status(400).send("no cid found for the course");
            return;

        }
        
        res.send(modules);
        
    }
    );

    //create new module and add to the existing modules
    app.post("/api/courses/:cid/modules", async (req,res)=>{
        console.log("app.post function on server is processing.");
        const {cid} = req.params;
        const newModule = {
            ...req.body, 
            course: cid,
            _id:new Date().getTime().toString()
        };
        let createdModuleByDB = await dao.createModule(newModule);
        console.log(`returned from db :${JSON.stringify(createdModuleByDB)}`);
        res.send(createdModuleByDB);
    });
    //delete module
    app.delete("/api/modules/:mid", (req, res)=>{
        const {mid} = req.params;
            console.log(` mid is: ${mid}`);
            dao.deleteModule(mid);//Database.modules = Database.modules.filter((m)=>m._id!== mid);
            res.sendStatus(200);
        
    }
    );
        //update module
    app.post("/api/modules/:mid", async(req, res)=>{
        
        const {mid} = req.params;
        console.log(`mid: ${mid}`);
        await dao.updateModule(mid, req.body);

        //const moduleIndex = Database.modules.findIndex((m)=>m._id ===mid);
        //Database.modules[moduleIndex] = {...Database.modules[moduleIndex], ...req.body};
        res.sendStatus(204);
    });


}
export default ModuleRoutes; 