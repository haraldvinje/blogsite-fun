import { doc, onSnapshot, getFirestore } from 'firebase/firestore'
import { Unsubscribe, User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebase'

export function useUserData(): { user: User | null; username: string | null } {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        let unsubscribe: Unsubscribe | undefined

        if (user) {
            const ref = doc(getFirestore(), 'users', user.uid)
            unsubscribe = onSnapshot(ref, (doc) => {
                setUsername(doc.data()?.username)
            })
        } else {
            setUsername(null)
        }

        return unsubscribe
    }, [user])

    return { user, username }
}

export function useOutsideClick(
    ref: React.MutableRefObject<HTMLElement>,
    handler: () => void
) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handler()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, handler])
}
