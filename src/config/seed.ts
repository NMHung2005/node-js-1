import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countUser === 0) {
        const defaultPassword = await hashPassword("123456");
        await prisma.user.createMany({
            data: [
                {
                    fullName: "hung",
                    username: "hunghung26",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM
                },
                {
                    fullName: "admin",
                    username: "hunghung",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM
                }
            ]
        })
    } else if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin co full quyen"
                },
                {
                    name: "USER",
                    description: "User thong thuong"
                }
            ]
        })
    } else {
        console.log("Already init data");
    }

}
export default initDatabase;