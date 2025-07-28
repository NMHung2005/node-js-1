import express, { Express } from "express";
import { getHomepage, getCreateUserPage } from "../controllers/user.controller";
const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/", getHomepage);
    router.get("/create-user", getCreateUserPage);
    app.use("/", router);
}
export default webRoute;