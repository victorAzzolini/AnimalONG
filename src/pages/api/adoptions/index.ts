import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "@/libs/prismadb";

const secret = process.env.NEXTAUTH_SECRET;

const adoptions = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: string | null;
    error: string | null;
  }>
) => {
  if (req.method != "PATCH") {
    res.setHeader("Allow", "PATCH");
    res.status(405).json({ data: null, error: "Método não permitido" });
  }

  const token = await getToken({ req, secret });

  const { id } = req.body;

  const checkIfUserHasAnimal = await prisma.user.findFirst({
    where: {
      id: token?.sub,
      animalIDs: {
        has: id,
      },
    },
  });

  if (checkIfUserHasAnimal) {
    res.status(422).json({
      data: null,
      error: "Usuário já apadrinhou esse animal",
    });
    return;
  }

  const checkIfAnimalHasUser = await prisma.animal.findFirst({
    where: {
      id: id,
      adopterIDs: {
        has: token?.sub,
      },
    },
  });

  if (!checkIfAnimalHasUser) {
    try {
      const updateAnimal = await prisma.animal.update({
        where: {
          id: id,
        },
        data: {
          adopterIDs: {
            push: token?.sub,
          },
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: token?.sub,
      },
      data: {
        animalIDs: {
          push: id,
        },
      },
    });
    res.status(200).json({ error: null, data: id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

export default adoptions;
