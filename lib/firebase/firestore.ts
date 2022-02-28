import { collection, where, getDocs, query, limit, Timestamp, DocumentSnapshot, QueryDocumentSnapshot, DocumentData, getFirestore } from 'firebase/firestore'

export interface User {
    username: string
    photoURL?: string
    displayName?: string
}

export interface Post {
    docId: string | null
    content: string
    createdAt: Timestamp | number
    heartCount: number
    published: boolean
    slug: string
    title: string
    uid: string
    updatedAt: Timestamp | number
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
    const q = query(collection(getFirestore(), 'users'), where('username', '==', username), limit(1))
    const userDoc = ((await getDocs(q)).docs)[0]
    return userDoc
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: DocumentSnapshot) {
    const data = doc.data() as Post
    if (!data) return null
    return {
        ...data,
        docId: doc.id,
        createdAt: (data?.createdAt as Timestamp).toMillis() || 0,
        updatedAt: (data?.updatedAt as Timestamp).toMillis() || 0
    }
}

