/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { getFirestore, doc, getDoc, writeBatch } from 'firebase/firestore'
import debounce from 'lodash.debounce'
import { authSignOut, googleSignInWithPopup } from 'lib/firebase/auth'
import { User } from 'firebase/auth'
import { UserContext } from 'lib/context'

const EnterPage = () => {
  const { user, username } = useContext(UserContext)
  return <main>{user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}</main>
}

function SignInButton() {
  return (
    <button
      className="flex h-16 w-1/5
                min-w-[200px] max-w-[300px]
                items-center justify-center rounded-md bg-gray
                text-sm font-bold hover:bg-dark-gray"
      onClick={googleSignInWithPopup}
    >
      <Image src="/google.png" width={50} height={50} alt="Logo" />
      Sign in with Google
    </button>
  )
}

function SignOutButton() {
  return (
    <button
      className="rounded-md bg-gray px-8 py-2 text-white hover:bg-dark-gray"
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

    const userDoc = doc(getFirestore(), 'users', (user as User).uid)
    const usernameDoc = doc(getFirestore(), `usernames/${formValue}`)

    const batch = writeBatch(getFirestore())
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName
    })
    batch.set(usernameDoc, { uid: (user as User).uid })

    await batch.commit()
  }

  return (
    !username && (
      <section>
        <h3 className="mb-4 font-bold">Choose Username</h3>
        <form className="flex-col" onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
            className="mb-2 w-full px-2"
          />

          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

          <button
            type="submit"
            disabled={!isValid}
            className="block rounded-md bg-light-green px-6 
                        py-3 font-bold text-white disabled:bg-dark-green
                        disabled:text-gray"
          >
            Choose
          </button>
        </form>
      </section>
    )
  )
}

function UsernameMessage({
  username,
  isValid,
  loading
}: {
  username: string
  isValid: boolean
  loading: boolean
}) {
  const style = 'my-2'
  if (loading) {
    return <p className={`${style}`}>Checking...</p>
  } else if (isValid) {
    return <p className={`${style} text-green`}>{username} is available</p>
  } else if (username && !isValid) {
    return <p className={`${style} text-red`}>{username} is not available</p>
  } else {
    return <p className={`${style}`}></p>
  }
}

export default EnterPage
