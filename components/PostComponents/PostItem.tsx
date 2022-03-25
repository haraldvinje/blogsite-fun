import React from 'react'
import Link from 'next/link'
import { Post } from 'lib/firebase/firestore'

export const PostItem = ({ post, admin = false }: { post: Post; admin: boolean }) => {
    const wordCount = post?.content.trim().split(/\s+/g).length
    const minutesToRead = (wordCount / 100 + 1).toFixed(0)

    const postUrl = admin ? `/admin/${post.slug}` : `/${post.username}/${post.slug}`

    return (
        <Link href={postUrl} passHref>
            <div className="w-full p-4 my-2 bg-white border border-gray rounded-md
                hover:scale-105 duration-300"
            >
                <Link href={`/${post.username}`}>
                    <a>
                        <strong>By @{post.username}</strong>
                    </a>
                </Link>

                <Link href={postUrl} passHref>
                    <h1 className="my-2 text-lg font-bold">
                        <a className="hover:cursor-pointer">{post.title}</a>
                    </h1>
                </Link>

                <footer className="w-full">
                    <span className="text-sm mr-2">
                        {wordCount} words. {minutesToRead} min read.
                    </span>
                    {admin ?
                        <span className="text-sm">
                            {post.published ? "✅ Published" : "❌ Not published"}
                        </span> :
                        <></>
                    }
                    <span className="text-right block float-right">
                        💙 {post.heartCount} hearts
                    </span>
                </footer>
            </div>
        </Link>
    )
}