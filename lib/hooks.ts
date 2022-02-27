import { doc, onSnapshot, getFirestore } from 'firebase/firestore'
import { Unsubscribe, User } from 'firebase/auth'
import { useEffect, useState } from 'react'
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