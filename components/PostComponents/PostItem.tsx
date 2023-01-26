import Link from 'next/link'
import { Post } from 'lib/firebase/firestore'

export const PostItem = ({ post, admin = false }: { post: Post; admin: boolean }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length
  const minutesToRead = (wordCount / 180).toFixed(0)

  const postUrl = admin ? `/admin/${post.slug}` : `/${post.username}/${post.slug}`

  return (
    <div
      className="my-2 w-full rounded-md border border-gray bg-white p-4
                duration-300 hover:scale-105"
    >
      <Link href={`/${post.username}`}>
        <strong>By @{post.username}</strong>
      </Link>

      <Link href={postUrl}>
        <h1 className="my-2 text-lg font-bold hover:cursor-pointer">{post.title}</h1>
      </Link>

      <footer className="flex w-full justify-between">
        <span className="mr-2 text-xs sm:text-sm">
          {wordCount} words. {minutesToRead} min read.
        </span>
        {admin ? (
          <span className="text-xs sm:text-sm">
            {post.published ? '✅ Published' : '❌ Not published'}
          </span>
        ) : (
          <></>
        )}
        <span className="text-xs sm:text-sm">💙 {post.heartCount} hearts</span>
      </footer>
    </div>
  )
}
