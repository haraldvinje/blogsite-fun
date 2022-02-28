import { doc, getFirestore, DocumentData, getDocs, query, where, DocumentReference, collection } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { Post, postToJSON } from '../../lib/firebase/firestore'
import { PostForm } from './PostForm'


export const PostManager = () => {
    const [preview, setPreview] = useState(false)
    const [post, setPost] = useState<DocumentData>(null)
    const [postRef, setPostRef] = useState<DocumentReference>(null)
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return
        const { slug } = router.query
        const fetchPost = async () => {
            const uid = getAuth().currentUser.uid
            const postsRef = collection(getFirestore(), 'users', uid, 'posts')
            const postsQuery = query(
                postsRef,
                where('slug', '==', slug)
            )
            const post = (await getDocs(postsQuery)).docs.map(postToJSON)[0]
            setPost(post)
            setPostRef(doc(getFirestore(), 'users', uid, 'posts', post.docId))
        }
        if (slug !== undefined) {
            fetchPost()
        }
    }, [router.isReady, router.query])

    return (
        <main className='w-[100%]'>
            {post && (
                <div className='flex'>
                    <section className='w-[70%] h-full'>
                        <PostForm
                            postRef={postRef}
                            originalPostValues={post as Post}
                            preview={preview} />
                    </section>
                    <div className='flex grow justify-center items-center h-64'>
                        <div className='flex flex-col justify-center items-center w-full'>
                            <h3 className='text-[20px] font-semibold'>Tools</h3>
                            <button onClick={() => setPreview(!preview)}
                                className='bg-gray hover:bg-dark-gray w-[80%] h-[50px] rounded-md'
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