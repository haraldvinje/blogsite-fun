import { doc, onSnapshot, getFirestore } from 'firebase/firestore'
import { Unsubscribe, User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'lib/firebase/firebase'

export function useUserData(): { user: User | null; username: string | null } {
    const [authUser] = useAuthState(auth)
    const [user, setUser] = useState<User>(null)
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        let unsubscribe: Unsubscribe | undefined

        if (authUser) {
            const ref = doc(getFirestore(), 'users', authUser.uid)
            unsubscribe = onSnapshot(ref, (doc) => {
                setUsername(doc.data()?.username)
                setUser(authUser)
            })
        } else {
            setUsername(null)
            setUser(null)
        }

        return unsubscribe
    }, [authUser])

    return { user, username }
}