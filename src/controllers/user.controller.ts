import { Request, Response } from "express";
import { handleCreateUser } from "../sevices/user.service";
const getHomepage = (req: Request, res: Response) => {
    return res.render('home');
}
const getCreateUserPage = (req: Request, res: Response) => {
    return res.render('create-user');
}

const postCreateUser = (req: Request, res: Response) => {
    const { fullName, email, address } = req.body
    //handle create user
    handleCreateUser(fullName, email, address);
    return res.redirect("/");
}
export { getHomepage, getCreateUserPage, postCreateUser };