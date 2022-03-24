import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Timestamp } from 'firebase/firestore'
import { Post } from 'lib/firebase/firestore'
import { toDateTimeString } from 'lib/utils'

export const PostContent = ({post}: {post: Post}) => {
    const createdAt =
        typeof post.createdAt === 'number'
            ? Timestamp.fromMillis(post.createdAt)
            : post.createdAt

    return (
        <div className='bg-white py-8 px-8 rounded-md border-2 border-gray'>
            <h1 className='text-2xl font-bold pb-4'>{post?.title}</h1>
            <span>
                Written by{' '}
                <Link href={`/${post.username}`}>
                    <a className="text-blue">@{post.username}</a>
                </Link>{' '}
                on {toDateTimeString(createdAt)}
            </span>
            <div className='mt-4 prose break-words'>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </div>
    )
}
