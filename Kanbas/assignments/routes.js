
import Database from "../Database/index.js";


function AssignmentRoutes(app) {

    {/*API to add new assignment to database.  */}
    app.post("/api/courses/assignments", (req, res) => {
        console.log("connected to server");
        
        const newAssignment =  req.body;
        Database.assignments.unshift(newAssignment);
        res.sendStatus(200);
        console.log("new assignment posted (added) to server.");
    });

    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const {courseId} = req.params;
        const assignments = Database.assignments.filter((a)=>a.course ===String(courseId));
        
        if(assignments && assignments.length > 0) {
            //console.log(assignments);
            res.send(assignments);

        }
        else {
            res.sendStatus(404);
        }
       
    });

    app.delete("/api/courses/:courseId/assignments/:assignmentId",(req, res) => {
        
        const {courseId, assignmentId} = req.params;
        if (assignmentId && assignmentId.length != 0) {
            //find the assignment object in the assignments list in Database by assignmentId.
           Database.assignments = Database.assignments.filter((a)=> a._id !== assignmentId);
           console.log(`Database assignments after deletion : ${Database.assignments}`);
           res.sendStatus(200);
        
        }
        
        else {
            console.log("assignmentId is not provided or null.");
            res.sendStatus(404);
        }
        
        
    } );    
    
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const {courseId} = req.params;
        const updatedAssignment = req.body;
        Database.assignments = Database.assignments.map((a)=>{
            try{
            
                if(a._id === updatedAssignment._id) {
                    return updatedAssignment;
                }
                else {
                    return a;
                }
        }
            catch (error) {
                console.log("unknow error in server's update new assignment API");
                return a;
                
            }
        }

        );
        res.status(200).send(Database.assignments);
    });


    





};
export default AssignmentRoutes;