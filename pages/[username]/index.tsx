import { GetServerSideProps } from "next"
import { query, getFirestore, collection, where, getDocs, limit, orderBy } from 'firebase/firestore'
import { getUserWithUsername, postToJSON, User, Post } from "../../lib/firebase/firestore"
import UserProfile from 'components/UserProfile'
import { PostFeed } from 'components/PostComponents/PostFeed'

export const getServerSideProps: GetServerSideProps = async ({
    query: urlQuery
}) => {
    const { username } = urlQuery

    const userDoc = await getUserWithUsername(username as string)

    if (!userDoc) {
        return {
            notFound: true
        }
    }

    let user = null
    let posts = null

    if (userDoc) {
        user = userDoc.data()
        const postsQuery = query(
            collection(getFirestore(), userDoc.ref.path, 'posts'),
            where('published', '==', true),
            orderBy('createdAt', 'desc'),
            limit(5)
        )
        posts = (await getDocs(postsQuery)).docs.map(postToJSON)
    }

    return {
        props: { user, posts }
    }
}

const UserProfilePage = ({ user, posts }: { user: User; posts: Post[] }) => {
    return (
        <main>
            <UserProfile user={user} />
            <PostFeed posts={posts} admin={false} />
        </main>
    )
}

export default UserProfilePage

