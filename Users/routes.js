import * as dao from "./dao.js";
//let currentUser = null;


export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        
        //add a new id to the new user.
        const newUser = {
            ...req.body, 
            _id:new Date().getTime().toString()
        };
        const user= await dao.createUser(newUser);
        res.json(user);
        };
            

    const deleteUser = async (req, res) => { 
        console.log("in server, preparing to delete");
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => { 
        const {role} = req.query;
        if(role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }
        const users = await dao.findAllUsers();
        res.json(users);
        return;
        
        
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
     };
    const updateUser = async (req, res) => {
        
            const userId = req.session["currentUser"]._id;
            const status = await dao.updateUser(userId, req.body);
            const currentUser = await dao.findUserById(userId);
            req.session["currentUser"]= currentUser;//added by myself
            res.json(status);
            
    };
    const signup = async (req, res) => {
        console.log("signup routes.js");
       const user = await dao.findUserByUsername(req.body.username);
       if (user) {
        res.status(400).json({message:"Username already taken"});
       }
       const newUser = {
        ...req.body, 
        _id:new Date().getTime().toString()
    };

       const currentUser = await dao.createUser(newUser);
       
       req.session["currentUser"] = currentUser;
       res.json(currentUser);
     };

    const signin = async (req, res) => {
        console.log("testing signin");
        const { username, password } = req.body;
        console.log(`username got in routes.js -signin is: ${username}`);
        console.log(`passwork got in routes.js -signin is: ${password}`);
        
        const currentUser = await dao.findUserByCredentials(username, password);
        console.log(`user found in signing in: ${currentUser}`);
        
        if (currentUser  ){
            //console.log("currentUser has value in routes.js - signin");
            req.session["currentUser"] = currentUser;
            //console.log("processing currentUser")
            res.json(currentUser);
        }
        else {
            console.log("else situation entered in routes.js - signin, why?");
            res.sendStatus(401);
        }
        
       
    };
    const signout = (req, res) => {
        console.log("processing signout in routes.js");
        req.session.destroy();
        res.sendStatus(200);

     };
    const profile = async (req, res) => {
        //console.log("entered routes.js-profile");
       
        let currentUser = req.session["currentUser"];
        //GlobalCurrentUser = currentUser;//added by myself
        if(!currentUser){
            res.sendStatus(401);
            return;
        }
            res.json(currentUser);




    };
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
}