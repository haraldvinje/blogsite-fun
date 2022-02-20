import { collection, where, getDocs, query, limit, Timestamp, DocumentSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { firestore } from './firebase'

export interface User {
    username: string
    photoURL?: string
    displayName?: string
}

export interface Post {
    content: string
    createdAt: Timestamp
    heartCount: number
    published: boolean
    slug: string
    title: string
    uid: string
    updatedAt: Timestamp
    username: string
    hearts: number
}

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(
    username: string
): Promise<QueryDocumentSnapshot<DocumentData>> {
    const q = query(collection(firestore, 'users'), where('username', '==', username), limit(1))
    const userDoc = ((await getDocs(q)).docs)[0]
    return userDoc
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: DocumentSnapshot) {
    const data = doc.data()
    if (!data) return {}
    return {
        ...data,
        createdAt: data?.createdAt.toMillis() || 0,
        updatedAt: data?.updatedAt.toMillis() || 0
    }
}

