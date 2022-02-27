import { GetStaticPaths, GetStaticProps } from 'next'
import { collectionGroup, getFirestore, doc, getDocs, query, limit, getDoc } from 'firebase/firestore'
import { isEmpty } from '../../lib/utils'
import { getUserWithUsername, Post, postToJSON } from '../../lib/firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { PostContent } from '../../components/PostComponents/PostContent'
import AuthCheck from '../../components/AuthCheck'
import { HeartButton } from '../../components/PostComponents/HeartButton'

interface StaticProps {
    post: Post
    path: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { username, slug } = params as { username: string; slug: string }
    const userDoc = await getUserWithUsername(username)

    let post
    let path: string
    let success = false

    if (userDoc) {
        const postRef = doc(getFirestore(), userDoc.ref.path, 'posts', slug)
        path = postRef.path
        try {
            post = postToJSON(await getDoc(postRef))
            success = !isEmpty(post)
        } catch (error) {
            success = false
        }
    }
    if (success) {
        return { props: { post, path }, revalidate: 5000}
    }
    return {
        notFound: true
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const q = query(collectionGroup(getFirestore(), 'posts'), limit(20))
    const snapshot = await getDocs(q)

    const paths = snapshot.docs.map((doc) => {
        const { slug, username } = doc.data()
        return {
            params: { username, slug }
        }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

const Post = ( {post, path}: StaticProps ) => {

    const postRef = doc(getFirestore(), path)
    const [realtimePost] = useDocumentData(postRef)

    const postToShow = realtimePost as Post || post

    return (
        <main className='flex flex-wrap'>
            <section className='w-[80%] mr-4 mb-4'>
                <PostContent post={postToShow} />
            </section>
            <section 
                className='bg-white border-2 border-gray rounded-md
                    flex flex-col grow max-w-[80%] h-48 items-center justify-center'
                >
                <p>{postToShow.heartCount}💙</p>
                <AuthCheck
                    fallback={
                        <div>
                            <a href="/enter" className='text-blue hover:underline' target="_blank">Sign in</a>
                            &nbsp;to 💙
                        </div>
                    }
                >
                    <HeartButton postRef={postRef} />
                </AuthCheck>
            </section>
        </main>
    )
}

export default Post