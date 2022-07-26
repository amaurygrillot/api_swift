
import {v4 as uuidv4} from 'uuid';
import { User} from "../models/user.model";
import { AuthController} from "../controllers/auth.controller";

const express = require('express')
const authRouter = express.Router();

authRouter.post("/subscribe",  async function(req: any, res: any){
    const mail = req.body.mail;
    const login = req.body.login;
    const password = req.body.password;
    const updateAt = new Date();
    const createdAt = new Date();
    if( mail === undefined
        || login === undefined
        || password === undefined) {
        res.status(400).send("Some parameters are missing.").end();
        return;
    }

    const authController = new AuthController();
    const id = uuidv4();
    const user = new User({
        id,
        mail,
        login,
        password,
        updateAt,
        createdAt
    });

    const userCreated = await authController.ClientSubscribe(user);
    if(userCreated === null)
    {
        res.status(400);
        res.write('Impossible de créer cet utilisateur');
        res.end();
        return;
    }
    res.status(201);
    res.json(user);
    res.end();

});

authRouter.post("/login", async function(req: any, res: any) {
    const login = req.body.login;
    const password = req.body.password;
    if(login === undefined || password === undefined) {
        res.status(400).send("Some parameters are missing.").end();
        return;
    }
    const authController = new AuthController();
    const session = await authController.login(login, password);
    if(session === null) {
        res.status(404).send("Account doesn't exist.").end();
    } else {
        res.json({
            token: session.token,
            userId: session.userId
        });
    }
});

authRouter.delete("/logout", async function(req: any, res: any) {
    const authController = new AuthController();
    const auth = req.headers["authorization"];
    if(auth !== undefined) {
        const token = auth.slice(7);
        const result = await authController.logout(token);
        if(result === null){
            res.status(404).send("You're not logged in.");
            res.end();
        }
        res.status(200).json(result);
        res.end();
        return;
    }
    res.status(403).send("Access denied.");
    res.end();
});

export {
    authRouter
};
