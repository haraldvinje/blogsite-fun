import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getFirestore, collectionGroup, getDocs, Timestamp, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { postToJSON, Post } from 'lib/firebase/firestore'
import { PostFeed } from 'components/PostComponents/PostFeed'
import { Loader } from 'components/Loader'

const LIMIT = 5

export const getServerSideProps: GetServerSideProps = async () => {
    const ref = collectionGroup(getFirestore(), 'posts')
    const postsQuery = query(
        ref,
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(LIMIT)
    )

    const posts = (await getDocs(postsQuery)).docs.map(postToJSON)

    return {
        props: { posts }
    }
}

const Home = ({ posts }: { posts: Post[] }) => {
    const [visiblePosts, setVisiblePosts] = useState<Post[]>(posts)
    const [loading, setLoading] = useState(false)
    const [postsEnd, setPostsEnd] = useState(false)

    const getMorePosts = async () => {
        setLoading(true)
        if (visiblePosts.length === 0) {
            setLoading(false)
            setPostsEnd(true)
            return
        }

        const last = visiblePosts[posts.length - 1]
        const cursor =
            typeof last.createdAt === 'number'
                ? Timestamp.fromMillis(last.createdAt)
                : last.createdAt

        const ref = collectionGroup(getFirestore(), 'posts')
        const postsQuery = query(
            ref,
            where('published', '==', true),
            orderBy('createdAt', 'desc'),
            startAfter(cursor),
            limit(LIMIT)
        )

        const newPosts = (await getDocs(postsQuery)).docs.map(
            (doc) => doc.data() as Post
        )
        setVisiblePosts(visiblePosts.concat(newPosts))
        setLoading(false)

        if (newPosts.length < LIMIT) {
            setPostsEnd(true)
        }
    }

    return (
        <div className="flex pt-16">
            <div className="flex-col justify-center w-[100%]">
                <PostFeed posts={visiblePosts} admin={false} />
                <div className='text-center mt-4'>
                    {!loading && !postsEnd && (
                        <button
                            className='py-2 px-4 bg-blue text-white rounded-md hover:bg-gray-600'
                            onClick={getMorePosts}
                        >
                            Load More
                        </button>
                    )}
                    <Loader show={loading} />
                    {postsEnd && 'You have reached the end'}
                </div>
            </div>
        </div>
    )
}

export default Home