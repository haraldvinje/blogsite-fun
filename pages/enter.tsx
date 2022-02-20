/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next'
import React, { useContext, useCallback, useEffect, useState } from 'react'
import { getFirestore, doc, getDoc, writeBatch } from 'firebase/firestore'
import debounce from 'lodash.debounce'
import { authSignOut, googleSignInWithPopup } from '../lib/firebase/auth'
import { UserContext } from '../lib/context'

const EnterPage: NextPage = () => {
    const { user, username } = useContext(UserContext)
    return (
        <main>
            {user ? (
                !username ? (
                    <UsernameForm />
                ) : (
                    <SignOutButton />
                )
            ) : (
                <SignInButton />
            )}
        </main>
    )
}

function SignInButton() {
    return (
        <button
            className="flex items-center justify-center
                rounded-md bg-white
                h-16 w-1/5 min-w-[200px] max-w-[300px]
                text-sm font-bold"
            onClick={googleSignInWithPopup}
        >
            <img className="h-2/3 mr-2" src={'/google.png'} /> Sign in with
            Google
        </button>
    )
}

function SignOutButton() {
    return (
        <button
            className="py-2 px-8 bg-gray-400 rounded-md hover:bg-slate-500 text-white"
            onClick={() => authSignOut()}
        >
            Sign Out
        </button>
    )
}

function UsernameForm() {
    const [formValue, setFormValue] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user, username } = useContext(UserContext)

    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username.length >= 3) {
                const ref = doc(getFirestore(), `usernames/${username}`)
                const snap = await getDoc(ref)
                setIsValid(!snap.exists())
                setLoading(false)
            }
        }, 500),
        []
    )

    useEffect(() => {
        checkUsername(formValue)
    }, [checkUsername, formValue])

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value.toLowerCase()
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

        if (val.length < 3) {
            setFormValue(val)
            setLoading(false)
            setIsValid(false)
        }

        if (re.test(val)) {
            setFormValue(val)
            setLoading(true)
            setIsValid(false)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const userDoc = doc(getFirestore(), 'users', user.uid)
        const usernameDoc = doc(getFirestore(), `usernames/${formValue}`)

        const batch = writeBatch(getFirestore())
        batch.set(userDoc, {
            username: formValue,
            photoURL: user.photoURL,
            displayName: user.displayName
        })
        batch.set(usernameDoc, { uid: user.uid })

        await batch.commit()
    }

    return (
        !username && (
            <section>
                <h3 className="font-bold mb-4">Choose Username</h3>
                <form className="flex-col" onSubmit={onSubmit}>
                    <input
                        name="username"
                        placeholder="username"
                        value={formValue}
                        onChange={onChange}
                        className="w-[100%] mb-2"
                    />

                    <UsernameMessage
                        username={formValue}
                        isValid={isValid}
                        loading={loading}
                    />

                    <button
                        type="submit"
                        disabled={!isValid}
                        className="block bg-green-500 px-6 py-3 
                        rounded-md text-white font-bold disabled:bg-slate-500
                        disabled:text-gray-400"
                    >
                        Choose
                    </button>
                </form>
            </section>
        )
    )
}

function UsernameMessage({username, isValid, loading}: { username: string; isValid: boolean; loading: boolean}) {
    const commonClass = 'my-2'
    if (loading) {
        return <p className={`${commonClass}`}>Checking...</p>
    } else if (isValid) {
        return (
            <p className={`${commonClass} text-green-400`}>
                {username} is available
            </p>
        )
    } else if (username && !isValid) {
        return (
            <p className={`${commonClass} text-red-400`}>
                {username} is not available
            </p>
        )
    } else {
        return <p className={`${commonClass}`}></p>
    }
}

export default EnterPage
