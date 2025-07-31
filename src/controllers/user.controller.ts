import { Request, Response } from "express";
import { getAllUsers, handleCreateUser } from "services/user.service";
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
    return res.redirect("/");
}
export { getHomepage, getCreateUserPage, postCreateUser, postDeleteUser };