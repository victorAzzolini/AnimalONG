import React from "react";
import axios from "axios";
import AnimalsPage from "@/components/pages/body/animals/AnimalsPage";
import AnimalFetchSlider from "@/components/pages/body/animals/AnimalFetchSlider";
import { Animal, User } from "@prisma/client";
import prisma from "@/libs/prismadb";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export interface Props {
  data: Animal[];
}

const AnimalsLandingPage = ({ data }: Props) => {
  return (
    <>
      <AnimalsPage />
      <AnimalFetchSlider data={data} />
    </>
  );
};

export default AnimalsLandingPage;

export async function getServerSideProps() {
  try {
    const res = await prisma.animal.findMany({
      select: {
        id: true,
        name: true,
        intAge: true,
        description: true,
        resumeDescription: true,
        images: true,
      },
    });

    const data = res;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
