import { createContext } from 'react'
import { User as FbUser } from 'firebase/auth'
import { User } from './firebase/firebase'

interface UserContext {
    user: User | FbUser | null
    username: string | null
}

const defaultState = {
    user: null,
    username: null
}

export const UserContext = createContext<UserContext>(defaultState)
