import { Request, Response } from "express";
import { getAllProduct } from "services/admin/product.service";
import { getAllUsers } from "services/user.service";

const getDashboardPage = async (req: Request, res: Response) => {

    return res.render('admin/dashboard/show.ejs');

}

const getAdminUserPage = async (req: Request, res: Response) => {
    const user = await getAllUsers();
    return res.render('admin/user/show.ejs', {
        users: user
    });

}
const getAdminProductPage = async (req: Request, res: Response) => {
    const product = await getAllProduct();
    return res.render('admin/product/show.ejs', {
        products: product
    });

}
const getAdminOrderPage = async (req: Request, res: Response) => {
    return res.render('admin/order/show.ejs');
}
export {
    getDashboardPage, getAdminUserPage,
    getAdminOrderPage, getAdminProductPage
};