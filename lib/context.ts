import { createContext } from 'react'
import { User } from 'firebase/auth'
import { User as FsUser } from 'lib/firebase/firestore'

interface UserContext {
  user: FsUser | User | null
  username: string | null
}

const defaultState = {
  user: null,
  username: null
}

export const UserContext = createContext<UserContext>(defaultState)
