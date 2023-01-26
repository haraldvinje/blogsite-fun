import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Timestamp } from 'firebase/firestore'
import { Post } from 'lib/firebase/firestore'
import { toDateTimeString } from 'lib/utils'

export const PostContent = ({ post }: { post: Post }) => {
  const createdAt =
    typeof post.createdAt === 'number' ? Timestamp.fromMillis(post.createdAt) : post.createdAt

  return (
    <div className="rounded-md border-2 border-gray bg-white p-8">
      <h1 className="pb-4 text-2xl font-bold">{post?.title}</h1>
      <span>
        Written by{' '}
        <Link href={`/${post.username}`} className="text-blue">
          @{post.username}
        </Link>{' '}
        on {toDateTimeString(createdAt)}
      </span>
      <div className="prose mt-4 break-words">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  )
}
