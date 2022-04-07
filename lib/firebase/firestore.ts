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
export function postToJSON(doc: DocumentSnapshot): Post|null {
    const data = doc.data() as Post
    if (!data) return null
    return {
        ...data,
        docId: doc.id,
        createdAt: (data?.createdAt as Timestamp)?.toMillis() || 0,
        updatedAt: (data?.updatedAt as Timestamp)?.toMillis() || 0
    } as Post
}


export async function getPostByUserAndSlug(uid: string, slug: string): Promise<Post|null> {
    const postsRef = collection(getFirestore(), 'users', uid, 'posts')
    const postsQuery = query(
        postsRef,
        where('slug', '==', slug)
    )
    return (await getDocs(postsQuery))?.docs?.map(postToJSON)?.[0]
}