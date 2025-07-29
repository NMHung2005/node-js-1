import express, { Express } from "express";
import { getHomepage, getCreateUserPage, postCreateUser } from "../controllers/user.controller";
const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/", getHomepage);
    router.get("/create-user", getCreateUserPage);
    router.post("/handle-create-user", postCreateUser);
    app.use("/", router);
}
export default webRoute;