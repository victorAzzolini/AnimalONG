import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export const config = {
  api: {
    bodyParser: false,
  },
};

const getAllAnimals = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "GET") {
    res.setHeader("Allow", "GET");
    res.status(401).json({
      data: null,
      error: "Método não permitido",
    });
    return;
  }

  try {
    const data = await prisma.animal.findMany({});

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return;
  }
};

export default getAllAnimals;
