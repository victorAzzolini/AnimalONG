import { NextApiRequest, NextApiResponse } from "next";
import { parseForm, FormidableError } from "@/libs/parse-form";
import prisma from "@/libs/prismadb";

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
  if (req.method != "POST") {
    res.setHeader("Allow", "POST");
    res.status(401).json({
      data: null,
      error: "Método não permitido",
    });
    return;
  }

  let images: string[] = [];

  //using formidable midware
  try {
    const { fields, files } = await parseForm(req);

    console.log({ files, fields });

    const { name, age, description, resumeDescription }: any  = fields;

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

    if (Object.keys(files).length === 0) {
      res.status(422).json({
        data: null,
        error: "É necessario adicionar ao menos uma imagem válida",
      });
      return;
    }

    if (Object.keys(files.images).length > 4) {
      res.status(422).json({
        data: null,
        error: "Máximo de 4 imagens",
      });
      return;
    }

    const file = files.images;

    if (Array.isArray(file)) {
      file.map((obj) => {
        images.push(obj.newFilename);
      });
    } else {
      images.push(file.newFilename);
    }

    let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;

    res.status(200).json({
      data: {
        message: "Ok",
        url,
      },
      error: null,
    });

    const intAge = parseInt(age);

    const animal = await prisma.animal.create({
      data: { name, intAge, description, resumeDescription ,images },
    });

    console.log(animal);
  } catch (error) {
    if (error instanceof FormidableError) {
      res
        .status(error.httpCode || 400)
        .json({ data: null, error: error.message });
    } else {
      console.log(error);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }
};

export default handler;
