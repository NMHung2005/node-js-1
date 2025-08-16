import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { error } from "console";
import { hashPassword } from "services/user.service";

const isEmailExist = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { username: email }
    })
    if (user)
        return true;
    else
        return false;
}
const registerNewUser = async (
    fullName: string,
    email: string,
    password: string
) => {

    const defaultPassword = await hashPassword(password);

    const userRole = await prisma.role.findUnique({
        where: { name: "USER" }
    })
    //insert into database
    if (userRole) {
        const createUser = await prisma.user.create({
            data: {
                username: email,
                fullName: fullName,
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId: userRole.id
            }
        })
        return createUser;
    } else {
        throw new error("User Role khong ton tai");
    }
}
const getUserAndRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id },
        include: {
            role: true
        },
        omit: {
            password: true
        }
    })
    return user;
}

export { isEmailExist, registerNewUser, getUserAndRoleById }