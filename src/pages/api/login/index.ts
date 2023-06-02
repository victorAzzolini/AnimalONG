import prisma from "@/libs/prismadb"
import bcrypt from "bcrypt"


import { NextApiRequest, NextApiResponse } from "next";

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(422).json({message: "Invalid Credentials"})
        return 
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    const checkPassword = await bcrypt.compare(password, user?.hashedPassword!)

    console.log(checkPassword)

    if (!checkPassword) {
        res.status(422).json({message: "Invalid Credentials"})
        return
    }

    // const token = signJwtAcessToken({
    //     name: user?.name,
    //     id: user?.id 
    // })

    return res.status(200).json({user: user?.name, id: user?.id})
}