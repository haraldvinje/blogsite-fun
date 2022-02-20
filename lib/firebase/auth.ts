import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './firebase'

export const googleAuthProvider = new GoogleAuthProvider()
export const googleSignInWithPopup = async () => {
    signInWithPopup(auth, googleAuthProvider).catch((error) => {
        error
    })
}

export const authSignOut = async () => signOut(auth)