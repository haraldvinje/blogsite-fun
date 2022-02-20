import { doc, getFirestore, DocumentReference, DocumentData, collection, CollectionReference } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { auth } from '../../lib/firebase/firebase'
import { Post } from '../../lib/firebase/firestore'
import { PostForm } from './PostForm'


export const PostManager = () => {
    const [preview, setPreview] = useState(false)
    const router = useRouter()

    const { slug } = router.query

    let postRef: DocumentReference<DocumentData> | undefined
    let collectionRef: CollectionReference<DocumentData> | undefined
    if (slug !== undefined) {
        postRef = doc(getFirestore(), 'users', auth.currentUser.uid, 'posts', slug as string)
        collectionRef = collection(getFirestore(), 'users', auth.currentUser.uid, 'posts')
    }
    const [post] = useDocumentDataOnce(postRef)

    return (
        <main className='w-[100%]'>
            {post && (
                <div className='flex'>
                    <section className='w-[70%] h-full'>
                        <PostForm
                            postRef={postRef}
                            postsCollectionRef={collectionRef}
                            originalPostValues={post as Post}
                            preview={preview} />
                    </section>
                    <div className='flex grow justify-center items-center h-64'>
                        <div className='flex flex-col justify-center items-center w-full'>
                            <h3 className='text-[20px] font-semibold'>Tools</h3>
                            <button onClick={() => setPreview(!preview)}
                                className='bg-gray-400 w-[80%] h-[50px] rounded-md'
                            >
                                {preview ? 'Edit' : 'Preview'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}