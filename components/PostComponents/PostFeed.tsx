import React from 'react'
import { Post } from 'lib/firebase/firestore'
import { PostItem } from 'components/PostComponents/PostItem'

export const PostFeed = ({ posts, admin }: { posts: Post[]; admin: boolean }) => {
    return (
        <>
            {posts ? (
                posts.map((post) => (
                    <PostItem post={post} key={post.slug} admin={admin} />
                ))
            ) : (
                <></>
            )}
        </>
    )
}