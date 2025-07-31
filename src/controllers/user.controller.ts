import { Request, Response } from "express";
import { getAllUsers, handleCreateUser, handleDeleteUser, getUserById } from "services/user.service";
import { log } from "console";
const getHomepage = async (req: Request, res: Response) => {
    //get users
    const user = await getAllUsers();
    return res.render('home', {
        users: user
    });
}
const getCreateUserPage = (req: Request, res: Response) => {
    return res.render('create-user');
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body
    //handle create user
    await handleCreateUser(fullName, email, address);
    return res.redirect("/");
}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/");
}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.render('view-user', {
        users: user
    });
}
export { getHomepage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser };