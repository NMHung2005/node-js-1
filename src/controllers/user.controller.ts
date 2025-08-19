import { Request, Response } from "express";
import { getProducts } from "services/client/item.service";
import {
    getAllUsers, handleCreateUser, handleDeleteUser,
    getUserById, updateUserById,
    getAllRoles
} from "services/user.service";

const getHomepage = async (req: Request, res: Response) => {
    const products = await getProducts();
    const user = req.user;
    return res.render('client/home/show.ejs', {
        products
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
    const { fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? "";
    //handle create user
    await handleCreateUser(fullName, username, address, phone, avatar, role);

    return res.redirect("/admin/user");
}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/admin/user");
}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    const roles = await getAllRoles();

    return res.render('admin/user/detail', {
        user: user,
        roles: roles
    });
}
const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;
    //update user by id
    const a = await updateUserById(id, fullName, phone, role, address, avatar);
    return res.redirect('/admin/user');
}
export { getHomepage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };