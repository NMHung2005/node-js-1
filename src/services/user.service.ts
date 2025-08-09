import getConnection from "config/db";
import { prisma } from "config/client";


const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string) => {

    //insert into database

    const createUser = await prisma.user.create({
        data: {
            username: fullName,
            address: address,
            fullName: email,
            password: "",
            accountType: ""
        }
    })
    return createUser;
}

const getAllUsers = async () => {
    const allUser = await prisma.user.findMany();
    return allUser;
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}

const handleDeleteUser = async (id: string) => {
    const deleteUser = await prisma.user.delete({
        where: { id: +id }
    })
    return deleteUser;
}
const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id }
    })
    return user;
}
const updateUserById = async (id: string, fullName: string, email: string, address: string) => {
    const updateUser = await prisma.user.update({
        where: { id: +id },
        data: {
            username: fullName,
            address: address,
            fullName: email,
            password: "",
            accountType: ""
        }
    })
    return updateUser;
}
export {
    handleCreateUser, getAllUsers, handleDeleteUser,
    getUserById, updateUserById, getAllRoles
};