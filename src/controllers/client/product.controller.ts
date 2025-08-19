import { prisma } from "config/client";
import { Request, Response } from "express"
import { getUserCartDetails } from "services/client/auth.service";
import { addProductToCart, deleteProductInCart, getProductById, updateCartDetailBeforeCheckout } from "services/client/item.service";
const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(id);
    return res.render("client/product/detail", {
        product
    });

}
const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    if (user) {
        await addProductToCart(1, +id, user);
    } else {
        res.redirect("/login");
    }

    return res.redirect("/");
}
const getCartPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (user) {
        const cartDetail = await getUserCartDetails(user.id);
        const totalPrice = cartDetail?.map(item => +item.price * +item.quantity)
            ?.reduce((a, b) => a + b, 0);
        return res.render("client/product/cart", {
            cartDetails: cartDetail,
            totalPrice: totalPrice
        });
    } else {
        return res.redirect("/login");
    }
}
const postDeleteProductInCart = async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;

    if (user) {
        await deleteProductInCart(+id, user.id, user.sumCart);
    } else {
        return res.redirect("/login");
    }
    return res.redirect("/cart");
}
const getCheckoutPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (user) {
        const cartDetail = await getUserCartDetails(user.id);
        const totalPrice = cartDetail?.map(item => +item.price * +item.quantity)
            ?.reduce((a, b) => a + b, 0);
        return res.render("client/product/checkout", {
            cartDetails: cartDetail,
            totalPrice: totalPrice
        });
    } else {
        return res.redirect("/login");
    }
}
const postHandleCartToCheckout = async (req: Request, res: Response) => {
    const user = req.user;
    if (user) {
        const currentCartDetail: { id: string; quantity: string }[]
            = req.body?.details ?? [];
        console.log(req.body.details);
        await updateCartDetailBeforeCheckout(currentCartDetail);
        return res.redirect("/checkout");
    } else {
        return res.redirect("/login");
    }
}
export {
    getProductPage, postAddProductToCart, getCartPage,
    postDeleteProductInCart, getCheckoutPage,
    postHandleCartToCheckout
}