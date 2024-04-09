const assignment = {
    id:1, title:"NodeJS Assignment", description: "Create a NodeJS server with ExpressJS", due: "2021-10-10", completed: false, score:0, 
};
const module = {
    id:1, name:"module name - Node.js", description:"this is a new module for WebDev", course:"new course 5610 SP2024"
};

const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
    ];

const Lab5 = (app) => {


    
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
        ...req.body,
        id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
});

    app.get("/a5/todos", (req, res) => {
        res.json(todos);
        });
    app.get("/a5/assignment", (req,res)=>{
        res.json(assignment)  //Sending Object to browser 
    });
    app.get("/a5/assignment/title", (req,res)=>{
        res.json(assignment.title)  //Sending Object to browser 
    });

    app.get("/a5/welcome", (req, res) => {
    res.send("Welcome to Assignment 5");
    });
    app.get("/a5/add/:a/:b", (req,res)=>{
        const {a,b} = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());   // don't send integers since can be interpreted by browser as status code
    });
    app.get("/a5/subtract/:a/:b", (req,res)=>{
        const {a,b} = req.params;
        const variance = parseInt(a) -parseInt(b);
        res.send(variance.toString());  // don't send integers since can be interpreted by browser as status code
    });
    app.get("/a5/calculator", (req, res)=>{
        const {a, b, operation} = req.query;    //The ? in the react app passed to the url is a symbol of start of  the query
        let result = 0;
        switch(operation) {
            case"add":
                result = parseInt(a) + parseInt(b);
                break;
            case"subtract":
                result = parseInt(a) - parseInt(b);
                break;
            default:
                result = "Invalid operation";
        }
        res.send(result.toString());   //must use toString because if not, the browser will interpret number to status code.
      
    
    });

    app.get("/a5/assignment/title/:newTitle", (req, res)=>{
        const {newTitle} = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });


    {/*Create a route that responds with the module object(see the top JSON object), mapped to /a5/module
 In the UI, create a link labeled Get Module that retrieves the module object from the server mapped at /a5/module    */}
    app.get("/a5/module", (req,res)=>{
       
        res.json(module);
    });
    {/*Create another route mapped to /a5/module/name that retrieves the name of the module created earlier */}
    app.get("/a5/module/name", (req,res)=>{
        res.json(module.name);
    });

     {/*Create an input field where we can type the new module name, and a link that invokes the route that updates the name.
Confirm that you can change the module's name.*/}
app.get("/a5/module/:name", (req,res)=>{
    const {name} = req.params;
    module.name = name;
    res.json(module.name);
});
    {/*Create routes and a corresponding UI that can modify the score and
completed properties of the assignment object. In the React application, create an input field of type number where you
can type the new score and an input field of type checkbox where you can select the completed property. Create a link that
updates the score and another link that updates the completed property. */}

app.get("/a5/assignment/:score", (req,res)=>{
    const {score} = req.params;
    
    assignment.score = parseInt(score);
    res.json(assignment.score);
});

  
 //!!!!!!!!!!!!!!!!!!!!!!to update------not returning updated checked status
 app.get("/a5/assignment/:completed",(req,res) => {
    const {completed} = req.params;
   
    assignment.completed = completed === 'true';
    res.json( assignment.completed );
});
 

    

    {/*modify description for assignment */}
    app.get("/a5/assignment/:description", (req, res)=> {
        const {description} = req.params;
        assignment.description = description;
        res.send(assignment.description);
    });
    app.get("/a5/module/:description", (req,res)=>{
        const {description}  = req.params;
        module.description = description;
        res.json(module.description);
    });

    app.get("/a5/todos", (req, res) => {
        console.log("processing node.js");
        const { completed } = req.query;
        console.log('Completed Query:', completed);
        if (completed !== undefined) {
        const completedBool = completed === 'true';
        const completedTodos = todos.filter((t) => t.completed === completedBool);
        res.json(completedTodos);
        return;
        }
        res.json({todos});
        });
    
    app.get("/a5/todos/create", (req, res) => {
            const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            completed: false,
            };
            todos.push(newTodo);
            res.json(todos);
            });
   
        

    
    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
        //
        });

        {/*!!!!!!!!!!!does not process anything from the first line -  section 3.3.3*/  }
        app.get("/a5/assignment/:score", (req,res)=>{
            const {score} = req.params;
            
            assignment.score = parseInt(score);
            res.json(assignment.score);
        });
        
          
         //!!!!!!!!!!!!!!!!!!!!!!to update------not returning updated checked status
         app.get("/a5/assignment/:completed",(req,res) => {
            const {completed} = req.params;
           
            assignment.completed = completed === 'true';
            res.json( assignment.completed );
        });

    
    app.delete("/a5/todos/:id", (req, res)=>{
        const {id} = req.params;
        const todo = todos.find((todo)=>todo.id === parseInt(id));
        {/*Error Handling  */}
        if(!todo) {
            res.status(404).json({message:`Unable to delete Todo with ID ${id}`});
            return;
        }


        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);                  // status 200 represents simple OK status.  
    });
    app.get("/a5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        const todoIndex = todos.indexOf(todo);
        if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        }
        res.json(todos);
        }); 

    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
        });

   
    app.get("/a5/todos/:id/description/:description", (req, res)=>{
        const {id, description} = req.params;
        const todo = todos.find((todo)=>todo.id===parseInt(id));
        todo.description = description;
        res.json(todos);
    });
    app.get("/a5/todos/:id/completed/:completed", (req, res)=>{
        const {id, completed} = req.params;
        const todo = todos.find((todo)=>todo.id===parseInt(id));
        todo.completed = completed === 'true';
        res.json(todos);
    });

    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.status(404).json({message:`Unable to update Todo with ID ${id}`});
            return;
        }
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
        });

};


    export default Lab5;    