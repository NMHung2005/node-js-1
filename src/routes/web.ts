import express, { Express } from "express";
import {
    getHomepage, getCreateUserPage, postCreateUser,
    postDeleteUser, getViewUser, postUpdateUser
} from "controllers/user.controller";
import {
    getDashboardPage, getAdminUserPage,
    getAdminProductPage, getAdminOrderPage
} from "controllers/admin/dashboard.controller"
const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/", getHomepage);
    router.post("/handle-create-user", postCreateUser);
    router.post("/handle-delete-user/:id", postDeleteUser);
    router.get("/handle-view-user/:id", getViewUser);
    router.post("/handle-update-user", postUpdateUser);

    //admin routes
    router.get("/admin", getDashboardPage);
    router.get("/admin/user", getAdminUserPage);
    router.get("/admin/product", getAdminProductPage);
    router.get("/admin/order", getAdminOrderPage);
    router.get("/admin/create-user", getCreateUserPage);

    app.use("/", router);
}
export default webRoute;