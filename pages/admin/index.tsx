import AuthCheck from "../../components/AuthCheck"
import { PostFeed } from "../../components/PostComponents/PostFeed"
import { collection, doc, serverTimestamp, query, orderBy, setDoc, getFirestore } from "firebase/firestore"
import { UserContext } from "../../lib/context"
import { auth } from "../../lib/firebase/firebase"

import { useContext, useState } from "react"
import { useRouter } from "next/router"

import { useCollection } from "react-firebase-hooks/firestore"
import kebabCase from 'lodash.kebabcase'
import { toast } from 'react-hot-toast'

const AdminPostsPage = () => {
    return (
        <main>
            <AuthCheck>
                <PostList />
                <CreateNewPost />
            </AuthCheck>
        </main>
    )
}

function PostList() {

    const userPostsRef = collection(getFirestore(), 'users', auth.currentUser.uid, 'posts')
    const postQuery = query(userPostsRef, orderBy('createdAt'))
    const [querySnapshot] = useCollection(postQuery)
    const posts = querySnapshot?.docs.map((doc) => doc.data())

    return (
        <>
            <h1 className="text-center text-[30px] font-bold">
                Manage your Posts
            </h1>
            <PostFeed posts={posts} admin={true} />
        </>
    )
}

function CreateNewPost() {
    const router = useRouter()
    const { username } = useContext(UserContext)
    const [title, setTitle] = useState('')
    const slug = encodeURI(kebabCase(title))
    const isValid = title.length > 3 && title.length < 100

    const createPost = async (e) => {
        e.preventDefault()
        const uid = auth.currentUser.uid
        const ref = doc(getFirestore(), 'users', uid, 'posts', slug)
        const data = {
            title,
            slug,
            uid,
            username,
            published: false,
            content: '# hello world!',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0
        }
        await setDoc(ref, data)
        toast.success('Post created')
        router.push(`/admin/${slug}`)
    }


    return (
        <form onSubmit={createPost}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Article!"
                className="w-full px-2 text-[40px] outline-0 my-2"
            />
            <p>
                <strong>Slug: </strong>{slug}
            </p>
            <button type="submit" disabled={!isValid} 
                className={`my-2 py-4 px-8 bg-green-500 rounded-md text-white
                    ${!isValid ? "bg-green-800 cursor-not-allowed" : "hover:bg-green-600"}`}
            >
                Create New Post
            </button>
        </form>

    )

}

export default AdminPostsPage
