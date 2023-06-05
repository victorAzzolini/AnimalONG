import React from 'react'
import AnimalRegister from '@/components/pages/body/animal_adoption/AnimalRegister'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { User } from '@prisma/client'

const AnimalRegisterBack = ({user} : {user: User}) => {
  return (
    <AnimalRegister {...user}/>
  )
}

export default AnimalRegisterBack

export async function getServerSideProps(context: any){
  const session = await getServerSession(context.req, context.res, authOptions)

  if(session?.user?.email != "admin@teste.com"){
    return  {
      redirect:{
        destination: "/",
        permanent: false
      }
    }
  }

  const user = session.user

  return {
    props: {
      user
    }
  }
}