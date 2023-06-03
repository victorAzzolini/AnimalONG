import React from "react";
import AnimalsPage from "@/components/pages/body/animals/AnimalsPage";
import AnimalFetchSlider from "@/components/pages/body/animals/AnimalFetchSlider";
import { Animal } from "@prisma/client";
import prisma from "@/libs/prismadb";


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
