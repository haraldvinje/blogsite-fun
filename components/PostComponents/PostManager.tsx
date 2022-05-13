import {
  doc,
  getFirestore,
  DocumentData,
  getDocs,
  query,
  where,
  deleteDoc,
  DocumentReference,
  collection
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import { Post, postToJSON } from 'lib/firebase/firestore'
import { PostForm } from 'components/PostComponents/PostForm'

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export const PostManager = () => {
  const [preview, setPreview] = useState(false)
  const [post, setPost] = useState<DocumentData>(null)
  const [postRef, setPostRef] = useState<DocumentReference>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    const { slug } = router.query
    const fetchAndSetPost = async () => {
      const uid = getAuth().currentUser.uid
      const postsRef = collection(getFirestore(), 'users', uid, 'posts')
      const postsQuery = query(postsRef, where('slug', '==', slug))
      const post = (await getDocs(postsQuery)).docs.map(postToJSON)[0]
      if (post) {
        setPost(post)
        setPostRef(doc(getFirestore(), 'users', uid, 'posts', post.docId))
      } else {
        router.push('/admin')
      }
    }
    if (slug !== undefined) {
      fetchAndSetPost()
    }
  }, [router])

  const handleDelete = async () => {
    deleteDoc(postRef)
      .then(() => {
        toast.success('Post deleted')
        router.push('/admin')
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  }

  return (
    <main className="w-[100%]">
      {post && (
        <div className="flex">
          <Modal
            isOpen={showDeleteModal}
            onRequestClose={() => setShowDeleteModal(false)}
            style={modalStyle}
          >
            <p className="mb-4 font-bold">Are you sure you want to delete this post?</p>
            <div className="flex justify-center">
              <button
                onClick={handleDelete}
                className="mx-4 rounded-md bg-dark-red
                                    px-4 py-2 text-white hover:bg-red hover:font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="mx-4 rounded-md bg-gray px-4 py-2 text-white hover:bg-dark-gray"
              >
                Cancel
              </button>
            </div>
          </Modal>
          <section className="h-full w-[70%]">
            <PostForm postRef={postRef} originalPostValues={post as Post} preview={preview} />
          </section>
          <div className="flex h-64 grow items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center">
              <h3 className="text-[20px] font-semibold">Tools</h3>
              <button
                onClick={() => setPreview(!preview)}
                className="my-4 h-[50px] w-[80%] rounded-md bg-gray hover:bg-dark-gray"
              >
                {preview ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="my-4 h-[50px] w-[80%]
                                    rounded-md bg-dark-red text-white hover:bg-red hover:font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
