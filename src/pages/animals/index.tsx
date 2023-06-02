import React from "react";
import axios from "axios";
import AnimalsPage from "@/components/pages/body/animals/AnimalsPage";
import AnimalFetchSlider from "@/components/pages/body/animals/AnimalFetchSlider";
import { Animal } from "@prisma/client";

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

export async function getStaticProps() {
  const res = await axios.get(`${process.env.MY_VARIABLE_API}/api/getanimals`);
  const data = res.data;

  return {
    props: {
      data: data.data,
    },
  };
}
