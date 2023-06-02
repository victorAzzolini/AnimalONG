import React from "react";
import axios from "axios";

import SingleAnimal from "@/components/pages/body/animals/SingleAnimal";

import { Animal } from "@prisma/client";

export interface Paths {
    params: Params,
  }
  
  export interface Params {
    id: string
  }

const SingleAnimalBack = ({data}: {data: Animal}) => {
  return <SingleAnimal {...data}/>;
};

export default SingleAnimalBack;

export async function getStaticPaths() {
  const res = await axios.get(`${process.env.MY_VARIABLE_API}/api/getanimals`);

  const data = res.data.data;

  const paths = data.map((animal: Animal) => ({
    params: { id: animal.id.toString() },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: Paths) {
  const res = await axios.get(`${process.env.MY_VARIABLE_API}/api/getanimals/${params.id}`);

  const data = res.data.data;

  return { props: { data } };
}
