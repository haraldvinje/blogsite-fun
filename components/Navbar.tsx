/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UserContext } from 'lib/context'
import { authSignOut } from 'lib/firebase/auth'
import { User } from 'firebase/auth'

import { DropdownMenu } from './DropdownMenu'

const Navbar = () => {
  const { user, username } = useContext(UserContext)

  const router = useRouter()

  const signOutNow = () => {
    authSignOut()
    router.reload()
  }

  return (
    <nav className="fixed top-0 flex h-20 w-screen border-b border-gray bg-white">
      <div className="flex w-[100%] flex-wrap">
        <ul className="mx-[20%] flex h-[100%] w-[100%] items-center">
          <li className="flex h-[100%] items-center">
            <Link href="/" passHref>
              <button
                className="rounded-md bg-black py-3 px-4
                                    text-xl font-bold text-white hover:text-gray"
              >
                FEED
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex w-[100%] flex-wrap">
        <ul className="mx-[20%] flex h-[100%] w-[100%] flex-row-reverse items-center">
          {username && (
            <>
              <li className="flex items-center">
                <DropdownMenu
                  head={
                    <img
                      src={user?.photoURL || '/hacker.png'}
                      className="h-[50px] w-[50px] rounded-full"
                      alt="Pic"
                    />
                  }
                >
                  <p
                    className="text-left text-[6px] font-bold sm:text-[10px]"
                  >
                    {(user as User)?.email}
                  </p>
                  <Link href="/admin">Admin</Link>
                  <Link href={`/${username}`}>My profile</Link>
                  <button onClick={signOutNow}>Sign Out</button>
                </DropdownMenu>
              </li>
              <li className="flex items-center">
                <Link href="/admin" passHref>
                  <button
                    className="mx-2 rounded-md bg-blue p-2 text-[10px] font-extrabold
                                        text-white hover:text-gray sm:py-4 sm:px-10 xl:px-4"
                  >
                    Write Posts
                  </button>
                </Link>
              </li>
            </>
          )}

          {!username && (
            <>
              <li>
                <Link href="/enter" passHref>
                  <button
                    className="rounded-md bg-blue py-4 
                                            px-10 text-[10px] font-extrabold text-white hover:text-gray"
                  >
                    Log In
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
