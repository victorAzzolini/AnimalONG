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

export async function getStaticPaths() {
  const res = await prisma.animal.findMany({});

  const data = res;

  const paths = data.map((animal: Animal) => ({
    params: { id: animal.id.toString() },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: Paths) {
  const res = await prisma.animal.findUnique({
    where: {
      id: params.id,
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
