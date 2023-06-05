import React from 'react'
import UserEdit from '@/components/pages/body/user/UserEdit'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { User } from '@prisma/client'

const UserEditBack = ({userEdit}: {userEdit: User}) => {
  return (
    <UserEdit {...userEdit}/>
  )
}

export default UserEditBack

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if(!session){
    return  {
      redirect:{
        destination: "/",
        permanent: false
      }
    }
  }

  const userEdit = session.user

  return {
    props: {
      userEdit
    }
  }
}