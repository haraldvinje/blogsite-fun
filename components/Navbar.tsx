import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { getAvatarImageUrl } from '../lib/utils'
import { UserContext } from '../lib/context'
import { authSignOut, googleSignInWithPopup } from '../lib/firebase/firebase'

import { DropdownMenu } from './DropdownMenu'

const Navbar = () => {
    const { user, username } = useContext(UserContext)

    const router = useRouter()

    const signOutNow = () => {
        authSignOut()
        router.reload()
    }

    return (
        <nav className="fixed top-0 bg-white flex w-screen border-b border-gray-300 h-20">
            <div className="flex flex-wrap w-[100%]">
                <ul className="h-[100%] w-[100%] flex items-center mx-[20%] xl:mx-[40%]">
                    <li className="h-[100%] flex items-center">
                        <Link href="/">
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
                                            src={getAvatarImageUrl(user)}
                                            className="h-[50px] w-[50px] rounded-full"
                                        />
                                    }
                                    className="bg-white p-2 border-gray-400 border text-black w-16 md:w-32"
                                >
                                    <p className="w-full cursor-default text-left truncate 
                                        text-[6px] font-bold sm:text-[10px]"
                                    >
                                        {user?.email}
                                    </p>
                                    <Link href="/admin">
                                        <button className="transition hover:bg-slate-300 duration-300 
                                            w-full text-left text-[10px] sm:text-sm"
                                        >
                                            Admin
                                        </button>
                                    </Link>
                                    <Link href={`/${username}`}>
                                        <button className="transition hover:bg-slate-300 duration-300 
                                            w-full text-left text-[10px] sm:text-sm"
                                        >
                                            My profile
                                        </button>
                                    </Link>
                                    <button
                                        onClick={signOutNow}
                                        className="transition hover:bg-slate-300 duration-300 mt-2
                                            text-left text-[10px] sm:text-sm w-full"
                                    >
                                        Sign Out
                                    </button>
                                </DropdownMenu>
                            </li>
                            <li className="flex items-center">
                                <Link href="/admin">
                                    <button className="bg-blue-800 py-2 sm:py-4 px-2 sm:px-10 mx-2
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
                                <Link href="/enter">
                                    <button
                                        onClick={googleSignInWithPopup}
                                        className="bg-blue-800 py-4 px-10 
                                            text-white text-[10px] font-extrabold rounded-md"
                                    >
                                        Log in
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
