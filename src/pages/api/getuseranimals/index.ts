import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "@/libs/prismadb";
import { Animal } from "@prisma/client";

const secret = process.env.NEXTAUTH_SECRET

const getUserAnimals = async (req: NextApiRequest, res: NextApiResponse<{
    data: Animal[] | null | any,
    error: string | null,
}>) => {
    if (req.method != "GET") {
        res.setHeader("Allow", "GET")
        res.status(405).json({
            data: null,
            error: "Método não permitido"
        })
        return
    }

    const token = await getToken({req, secret})


    try {
        const userAnimals = await prisma.animal.findMany({
            where: {
                adopterIDs: {
                    has: token?.sub
                }
            }
        })

        res.status(200).json({data: userAnimals, error: null})
    } catch (error) {
        console.log(error)
        res.status(500).json({data: null, error: "Internal Server Error"})
    }

}

export default getUserAnimals