import { prisma } from "config/client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "hunghung26",
                    password: "hunghugn26",
                    accountType: "ADMIN"
                },
                {
                    username: "hunghung",
                    password: "hunghung",
                    accountType: "USER"
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