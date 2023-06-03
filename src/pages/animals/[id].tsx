import React from "react";
import axios from "axios";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

import SingleAnimal from "@/components/pages/body/animals/SingleAnimal";

import { Animal } from "@prisma/client";

export interface Paths {
  params: Params;
}

export interface Params {
  id: string;
}

const SingleAnimalBack = ({ data }: { data: Animal }) => {
  return <SingleAnimal {...data} />;
};

export default SingleAnimalBack;

export async function getServerSideProps(context: any) {
 
  const id = context.req.url.substring(9)
  console.log(id)

  const res = await prisma.animal.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      intAge: true,
      resumeDescription: true,
      description: true,
      images: true,
    },
  });

  const data = res;

  return { props: { data } };
}
