import { Request, Response } from "express";
import {
    getAllUsers, handleCreateUser, handleDeleteUser,
    getUserById, updateUserById,
    getAllRoles
} from "services/user.service";

const getHomepage = async (req: Request, res: Response) => {
    //get users
    const user = await getAllUsers();
    return res.render('home', {
        users: user
    });
}
const getCreateUserPage = async (req: Request, res: Response) => {
    //get roles
    const roles = await getAllRoles();
    return res.render('admin/user/create', {
        roles: roles
    });
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body
    //handle create user
    const create = await handleCreateUser(fullName, email, address);

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
const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, email, address } = req.body;
    //update user by id
    const a = await updateUserById(id, fullName, email, address);
    return res.redirect('/');
}
export { getHomepage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };