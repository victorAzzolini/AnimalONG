import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      message: string;
    } | null;
    error: string | null;
  }>
) => {
  if (req.method != "POST") {
    res.setHeader("Allow", "POST");
    res.status(401).json({
      data: null,
      error: "Método não permitido",
    });
    return;
  }

  try {
    const { name, age, description, resumeDescription, images }: any = req.body;

    console.log(req.body);

    if (!name) {
      res
        .status(422)
        .json({ data: null, error: "É necessario adicionar um nome válido" });
      return;
    }

    if (!age) {
      res
        .status(422)
        .json({ data: null, error: "É necessario adicionar uma idade válida" });
      return;
    }

    if (!description) {
      res.status(422).json({
        data: null,
        error: "É necessario adicionar uma descrição válida",
      });
      return;
    }

    if (!resumeDescription) {
      res.status(422).json({
        data: null,
        error: "É necessario adicionar um resumo da descrição válido",
      });
      return;
    }

    console.log(images);

    if (images.length === 0) {
      res.status(422).json({
        data: null,
        error: "É necessario adicionar ao menos uma imagem válida",
      });
      return;
    }

    if (images.length > 3) {
      res.status(422).json({
        data: null,
        error: "Máximo de 4 imagens",
      });
      return;
    }

    res.status(200).json({
      data: {
        message: "Ok",
      },
      error: null,
    });

    const intAge = parseInt(age);

    const animal = await prisma.animal.create({
      data: { name, intAge, description, resumeDescription, images },
    });

    console.log(animal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

export default handler;
