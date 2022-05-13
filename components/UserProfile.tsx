/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { User } from 'lib/firebase/firestore'

const UserProfile = ({ user }: { user: User }) => {
  return (
    <>
      <div className="flex justify-center">
        <img
          src={user?.photoURL || '/hacker.png'}
          className="h-[200px] w-auto rounded-full"
          alt="Img"
        />
      </div>
      <div className="flex justify-center">
        <p>
          <i>@{user.username}</i>
        </p>
      </div>
      <div className="my-6 flex justify-center">
        <h1 className="text-xl font-bold">{user.displayName}</h1>
      </div>
    </>
  )
}

export default UserProfile
