import React from 'react'
import UserEdit from '@/components/pages/body/user/UserEdit'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

const UserEditBack = () => {
  return (
    <UserEdit/>
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

  const user = session.user

  return {
    props: {
      user
    }
  }
}