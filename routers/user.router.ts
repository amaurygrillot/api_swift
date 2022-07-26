
import { UserController} from "../controllers/user.controller";

const express = require('express')
const bcrypt = require('bcrypt')
export const userRouter = express.Router();

userRouter.get("/", async function(req: any, res: any) {
    const userController = new UserController();
    const userList = await userController.getAllUsers();
    res.status(200).json(userList).end();
});

userRouter.get("/:id", async function(req: any, res: any) {
    const id = req.params.id;
    const userController = new UserController();
    const user = await userController.getUserById(id);
    res.status(200).json(user).end();
});

userRouter.post("/update/:id", async function(req: any, res: any) {
    const id = req.params.id;
    const mail = req.body.mail;
    const login = req.body.login;
    let password = req.body.password;
    const createdAt = new Date();
    const updateAt = new Date();
    if( id === undefined
        || mail === undefined
        || login === undefined 
        || password === undefined) {
        res.status(400).send("Some parameters are missing.").end();
        return;
    }

    if(password !== '' && password.length < 20)
    {
        password = bcrypt.hashSync(password,15);
    }
    const userController = new UserController();

    const user = await userController.updateUser(id, {
        id,
        mail,
        login,
        password,
        updateAt,
        createdAt
    });

    res.status(201);
    res.json(user);
});

userRouter.get("/session/:token", async function(req: any, res: any) {
    const token = req.params.token;
    const userController = new UserController();
    const session = await userController.getSession(token);
    res.status(200).json(session).end();
});

userRouter.delete("/:id", async function(req: any, res: any) {
    const userController = new UserController();
    const result = await userController.removeUser(req.params.id);
    res.status(200).json(result).end();
});
