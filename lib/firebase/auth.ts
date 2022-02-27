import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'

export const googleAuthProvider = new GoogleAuthProvider()
export const googleSignInWithPopup = async () => {
    await signInWithPopup(getAuth(), googleAuthProvider).catch((error) => {
        error
    })
}

export const authSignOut = async () => signOut(getAuth())