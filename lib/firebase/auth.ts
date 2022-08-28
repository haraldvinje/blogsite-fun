import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from 'lib/firebase/firebase'

export const googleAuthProvider = new GoogleAuthProvider()
export const googleSignInWithPopup = async () => {
  await signInWithPopup(auth, googleAuthProvider).catch((error) => {
    error
  })
}

export const authSignOut = async () => signOut(getAuth())
