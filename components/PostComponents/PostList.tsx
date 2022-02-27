import React from 'react'
import { collection,  query, orderBy, getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { Post } from "../../lib/firebase/firestore"
import { PostFeed } from "../../components/PostComponents/PostFeed"

export const PostList = () => {

    const userPostsRef = collection(getFirestore(), 'users', getAuth().currentUser.uid, 'posts')
    const postQuery = query(userPostsRef, orderBy('createdAt'))
    const [querySnapshot] = useCollection(postQuery)
    const posts = querySnapshot?.docs.map((doc) => doc.data() as Post)

    return (
        <>
            <h1 className="text-center text-[30px] font-bold">
                Manage your Posts
            </h1>
            <PostFeed posts={posts} admin={true} />
        </>
    )
}