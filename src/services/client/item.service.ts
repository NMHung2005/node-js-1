import { prisma } from "config/client"

const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}
const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id: +id }
    })
    return product;
}
const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if (cart) {
        //update sum cart
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    increment: quantity
                }
            }
        })
        //update cart details
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        })
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity
                }
            },
            create: {
                cartId: cart.id,
                price: product.price,
                productId: productId,
                quantity: quantity
            }
        })
    } else {
        //create
        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cartDetails: {
                    create: [
                        {
                            price: product.price,
                            quantity: quantity,
                            productId: productId
                        }
                    ]
                }
            }
        })
    }
}
const deleteProductInCart = async (cartDetailId: number, userId: number, userSumCart: number) => {
    const cartDetail = await prisma.cartDetail.findUnique({
        where: {
            id: cartDetailId
        }
    })
    const quantity = cartDetail.quantity;
    // Xoa cart detail
    await prisma.cartDetail.delete({
        where: {
            id: cartDetailId
        }
    })

    //Update SumCart
    if (userSumCart === 1) {
        await prisma.cart.delete({
            where: {
                userId: userId
            }
        })
    } else {
        await prisma.cart.update({
            where: {
                userId: userId
            },
            data: {
                sum: {
                    decrement: quantity,
                }
            }
        })
    }
}
const updateCartDetailBeforeCheckout = async (data: { id: string; quantity: string }[]) => {
    for (let i = 0; i < data.length; i++) {
        await prisma.cartDetail.update({
            where: {
                id: +data[i].id
            },
            data: {
                quantity: +data[i].quantity
            }
        })
    }
}
export {
    getProducts, getProductById, addProductToCart, deleteProductInCart,
    updateCartDetailBeforeCheckout
}