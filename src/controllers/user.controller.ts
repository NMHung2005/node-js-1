import { Request, Response } from "express";
const getHomepage = (req: Request, res: Response) => {
    return res.render('home');
}
const getCreateUserPage = (req: Request, res: Response) => {
    return res.render('create-user');
}
export { getHomepage, getCreateUserPage };