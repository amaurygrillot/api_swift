import { Express } from "express";
import { authRouter} from "../routers/auth.router";
import { userRouter} from "../routers/user.router";


export function buildRoutes(app: Express) {
    app.get("/", async function(req, res) {
        res.send("Api swift");
    });

    app.use("/auth", authRouter);

    app.use("/user", userRouter);

}
