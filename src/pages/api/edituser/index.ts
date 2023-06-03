import { NextApiRequest, NextApiResponse } from "next";
import { parseForm, FormidableError } from "@/libs/parse-form";
import prisma from "@/libs/prismadb";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";

const secret = process.env.NEXTAUTH_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    const { fields, files }: any = await parseForm(req);
    const token = await getToken({ req, secret });

    console.log({ fields, files });

    const { name, email, password, confirmPassword }: {name: string, email: string, password: string, confirmPassword: string} = fields;

    console.log(fields.hashedPassword);

    if (!token) {
      res.status(422).json({
        data: null,
        error: "Por favor faça o login com sua conta",
      });
      return;
    }

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

    let hashedPassword = fields.hashedPassword;

    if (password !== confirmPassword) {
      res.status(422).json({
        data: null,
        error: "A senha e a confirmação de senha não conferem",
      });
      return;
    } else if (confirmPassword === confirmPassword && password != null) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    let images = fields.images;

    if (Object.keys(files).length > 0 && !Array.isArray(files.images)) {
      images = files.images.newFilename;
    }

    try {
      const user = await prisma.user.update({
        where: {
          id: token?.sub,
        },
        data: { name, email, images, hashedPassword },
      });

      console.log(user);
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
    if (error instanceof FormidableError) {
      res.status(error.httpCode || 400).json({
        data: null,
        error: error.message,
      });
    } else {
      console.log(error);
      res.status(500).json({
        data: null,
        error: "Internal Server Error",
      });
    }
  }
};

export default handler;
