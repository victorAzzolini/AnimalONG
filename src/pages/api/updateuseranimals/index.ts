import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "@/libs/prismadb";

const secret = process.env.NEXTAUTH_SECRET;

const updateUserAnimals = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: { message: string | null, animals: string[] | null | any } | null;
    error: string | null;
  }>
) => {
  if (req.method != "DELETE") {
    res.setHeader("Allow", "DELETE");
    res.status(405).json({ data: null, error: "Método não permitido" });
  }

  const token = await getToken({ req, secret });
  //   console.log(token);

  if (!token) {
    res.status(422).json({ data: null, error: "Usuário não logado" });
  }

  const { animalId }: any = req.query;

  const animals = await prisma.user.findUnique({
    where: {
      id: token?.sub,
    },
    select: {
      animalIDs: true,
    },
  });

  const users = await prisma.animal.findUnique({
    where: {
      id: animalId,
    },
    select: {
      adopterIDs: true,
    },
  });

  try {
    const animalsIDs  = await prisma.user.update({
      where: {
        id: token?.sub,
      },
      data: {
        animalIDs: {
          set: animals?.animalIDs.filter((id) => id !== animalId.toString()),
        },
      },
      select: {
        animalIDs: true
      }
    });

    await prisma.animal.update({
      where: {
        id: animalId,
      },
      data: {
        adopterIDs: {
          set: users?.adopterIDs.filter((id) => id !== token?.sub),
        },
      },
    });

    res.status(200).json({
      data: { message: "Cancelamento realizado com sucesso", animals: animalsIDs },
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

export default updateUserAnimals;
