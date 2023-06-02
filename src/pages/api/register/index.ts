import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { error } from "console";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, name, password, confirmPassword } = req.body;

  if (!email) {
    res.status(422).json({ message: "Register an email" });
    return;
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExist) {
    res.status(422).json({ message: "User already exist, try another email" });
    return;
  }

  if (!password) {
    res.status(422).json({ message: "Register a password" });
    return;
  }

  if (password != confirmPassword) {
    res
      .status(422)
      .json({ message: "Password confirmation does not match the password" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user
    .create({
      data: { email, name, hashedPassword },
    })
    .catch((error) => res.status(400).json(error));

  return res.status(200).json(user);
}
