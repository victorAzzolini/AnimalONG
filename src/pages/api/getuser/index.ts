import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const getUserByToken = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    res.setHeader("Allow", "GET");
    res.status(401).json({ message: "Método não permitido" });
  }

  const token = await getToken({ req, secret });

  try {
    const user = await prisma?.user.findUnique({
      where: {
        id: token?.sub,
      },
      select: {
        id: true,
        name: true,
        email: true,
        images: true
      }
    });

    res.status(200).json({ ...user  });
  } catch (error) {
    res.status(422).json({ message: "Usuário não encontrado" });
  }
};

export default getUserByToken;
