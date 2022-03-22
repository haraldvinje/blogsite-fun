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
        <nav className="fixed top-0 bg-white flex w-screen border-b border-gray h-20">
            <div className="flex flex-wrap w-[100%]">
                <ul className="h-[100%] w-[100%] flex items-center mx-[20%] xl:mx-[40%]">
                    <li className="h-[100%] flex items-center">
                        <Link href="/" passHref>
                            <button className="bg-black font-bold py-3 px-4 text-white text-xl rounded-md">
                                FEED
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex flex-wrap w-[100%]">
                <ul className="h-[100%] w-[100%] flex flex-row-reverse mx-[20%] xl:mx-[40%] items-center">
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
                                    <p className="text-left
                                        text-[6px] font-bold sm:text-[10px]"
                                    >
                                        {(user as User)?.email}
                                    </p>
                                    <Link href="/admin">
                                        Admin
                                    </Link>
                                    <Link href={`/${username}`}>
                                        My profile
                                    </Link>
                                    <button onClick={signOutNow}>
                                        Sign Out
                                    </button>
                                </DropdownMenu>
                            </li>
                            <li className="flex items-center">
                                <Link href="/admin" passHref>
                                    <button className="bg-blue py-2 sm:py-4 px-2 sm:px-10 mx-2
                                        text-white text-[10px] font-extrabold rounded-md xl:px-4"
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
                                        className="bg-blue py-4 px-10 
                                            text-white text-[10px] font-extrabold rounded-md"
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
