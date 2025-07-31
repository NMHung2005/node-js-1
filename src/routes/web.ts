import express, { Express } from "express";
import { getHomepage, getCreateUserPage, postCreateUser, postDeleteUser } from "controllers/user.controller";
const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/", getHomepage);
    router.get("/create-user", getCreateUserPage);
    router.post("/handle-create-user", postCreateUser);
    router.post("/handle-delete-user/:id", postDeleteUser);
    app.use("/", router);
}
export default webRoute;