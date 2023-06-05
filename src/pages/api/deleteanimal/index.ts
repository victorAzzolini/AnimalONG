import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const deleteAnimal = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      message: string | null;
    } | null;
    error: string | null;
  }>
) => {
  if (req.method != "DELETE") {
    res.setHeader("Allow", "DELETE");
    res.status(401).json({ data: null, error: "Método não permitido" });
  }

  const { id } = req.query;

  try {
    await prisma.animal.delete({
      where: { id: id?.toString() },
    });

    res
      .status(200)
      .json({ data: { message: "Animal excluído com sucesso" }, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

export default deleteAnimal;
