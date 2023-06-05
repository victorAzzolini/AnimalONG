import { NextApiRequest, NextApiResponse } from "next";
import { parseForm, FormidableError } from "@/libs/parse-form";
import { getToken } from "next-auth/jwt";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      message: string;
      url: string | string[];
    } | null;
    error: string | null;
  }>
) => {
  if (req.method != "PATCH") {
    res.setHeader("Allow", "PATCH");
    res.status(401).json({
      data: null,
      error: "Método não permitido",
    });
  }

  try {
    const token = await getToken({ req, secret });

    const {
      name,
      email,
      password,
      confirmPassword,
      images,
    }: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      images: string[];
    } = req.body;

    if (!token) {
      res.status(422).json({
        data: null,
        error: "Por favor faça o login com sua conta",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: token?.email?.toString(),
      },
    });

    let hashedPassword = user?.hashedPassword;

    if (!name) {
      res.status(422).json({
        data: null,
        error: "Coloque um nome válido",
      });
      return;
    }

    if (!email) {
      res.status(422).json({
        data: null,
        error: "Coloque um email válido",
      });
      return;
    }

    const checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (token.email !== email && checkUser) {
      res.status(422).json({
        data: null,
        error: "Coloque um email válido",
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({
        data: null,
        error: "A senha e a confirmação de senha não conferem",
      });
      return;
    } else if (password === confirmPassword && password != null) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    try {
      await prisma.user.update({
        where: {
          id: token?.sub,
        },
        data: { name, email, images, hashedPassword },
      });

      res.status(200).json({
        data: {
          message: "Atualizado com sucesso",
          url: images,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: null,
        error: "Internal Server Error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: null,
      error: "Internal Server Error",
    });
  }
};

export default handler;
