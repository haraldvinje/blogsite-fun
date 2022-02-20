import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Post } from '../../lib/firebase/firestore'
import { toDateTimeString } from '../../lib/utils'

export const PostContent = ({post}: {post: Post}) => {
    const createdAt =
        typeof post.createdAt === 'number'
            ? new Date(post.createdAt)
            : post.createdAt

    return (
        <div className='bg-white py-8 px-4 rounded-md border-2 border-gray-400'>
            <h1 className='text-2xl font-bold pb-4'>{post?.title}</h1>
            <span>
                Written by{' '}
                <Link href={`/${post.username}`}>
                    <a className="text-blue-600">@{post.username}</a>
                </Link>{' '}
                on {toDateTimeString(createdAt)}
            </span>
            <div className='mt-4 prose break-words'>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </div>
    )
}
