import { GetStaticPaths, GetStaticProps } from 'next'
import {
  collectionGroup,
  getFirestore,
  doc,
  getDocs,
  query,
  limit,
  where,
  collection
} from 'firebase/firestore'
import { isEmpty } from 'lib/utils'
import { getUserWithUsername, Post, postToJSON } from 'lib/firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { PostContent } from 'components/PostComponents/PostContent'
import AuthCheck from 'components/AuthCheck'
import { HeartButton } from 'components/PostComponents/HeartButton'
import Metatags from 'components/Metatags'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username, slug } = params as { username: string; slug: string }
  const userDoc = await getUserWithUsername(username)

  let post: Post | null
  let path: string
  let success = false

  if (userDoc) {
    const postsRef = collection(getFirestore(), userDoc.ref.path, 'posts')
    const postQuery = query(postsRef, where('slug', '==', slug), where('published', '==', true))
    try {
      post = (await getDocs(postQuery)).docs.map(postToJSON)[0]
      path = `${username}/${post.slug}`
      success = !isEmpty(post)
    } catch (error) {
      success = false
    }
  }
  if (success) {
    return { props: { post, path }, revalidate: 5000 }
  }
  return {
    notFound: true
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const q = query(
    collectionGroup(getFirestore(), 'posts'),
    where('published', '==', true),
    limit(20)
  )
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

const Post = ({ post }: { post: Post }) => {
  const postRef = doc(getFirestore(), 'users', post.uid, 'posts', post.docId)
  const [realtimePost] = useDocumentData(postRef)

  const postToShow = (realtimePost as Post) || post

  return (
    <>
      <Metatags title={post.title} />
      <main className="flex flex-wrap">
        <section className="mr-2 mb-4 w-[80%]">
          <PostContent post={postToShow} />
        </section>
        <section
          className="
                    flex h-48 max-w-[40%] grow flex-col items-center justify-center"
        >
          <p>{postToShow.heartCount}💙</p>
          <AuthCheck
            fallback={
              <div>
                <a href="/enter" className="text-blue hover:underline" target="_blank">
                  Sign in
                </a>
                &nbsp;to 💙
              </div>
            }
          >
            <HeartButton postRef={postRef} />
          </AuthCheck>
        </section>
      </main>
    </>
  )
}

export default Post
