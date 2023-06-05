import React from "react";
import prisma from "@/libs/prismadb";
import { Animal } from "@prisma/client";
import AnimalEdit from "@/components/pages/body/animals/AnimalEdit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const SingleEditAnimalBack = ({ data }: { data: Animal }) => {
  return <AnimalEdit {...data} />;
};

export default SingleEditAnimalBack;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.email != "admin@teste.com") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  
  const id = context.req.url.substring(14);

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
