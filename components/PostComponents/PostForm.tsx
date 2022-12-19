import { updateDoc, DocumentReference, DocumentData, serverTimestamp } from 'firebase/firestore'
import { getPostByUserAndSlug } from 'lib/firebase/firestore'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import kebabCase from 'lodash.kebabcase'
import { Post } from 'lib/firebase/firestore'
import { PostContent } from 'components/PostComponents/PostContent'
import { ImageUploader } from 'components/PostComponents/ImageUploader'
import { getAuth } from 'firebase/auth'

type FormInputs = {
  title: string
  content: string
  published: boolean
}

export const PostForm = ({
  postRef,
  originalPostValues,
  preview
}: {
  postRef: DocumentReference<DocumentData>
  originalPostValues: Post
  preview: boolean
}) => {
  const { register, handleSubmit, reset, watch, formState } = useForm<FormInputs>({
    defaultValues: originalPostValues,
    mode: 'onChange'
  })
  const { errors } = formState
  const slug = kebabCase(watch('title'))

  const updatePost = async ({ title, content, published }) => {
    const data = { title, content, published, slug, updatedAt: serverTimestamp() }
    getPostByUserAndSlug(getAuth().currentUser.uid, slug)
      .then((post) => {
        if (post?.title === title && post?.docId !== postRef.id) {
          toast.error('Title already exists. Change title.')
        } else {
          updateDoc(postRef, data)
          toast.success('Updated successfully!')
          reset({ title, content, published })
        }
      })
      .catch(() => toast.error('Something went wrong'))
  }

  return (
    <form className="min-h-[50vh]" onSubmit={handleSubmit(updatePost)}>
      <input
        defaultValue={originalPostValues.title}
        className="mb-4 border-2 border-gray text-2xl font-bold"
        {...register('title', {
          minLength: { value: 3, message: 'Title is too short' },
          maxLength: { value: 100, message: 'Title is too long' },
          required: { value: true, message: 'Title is required' }
        })}
      />
      <p className="mb-4">ID: {kebabCase(watch('title'))}</p>
      {preview && (
        <PostContent
          post={{
            ...originalPostValues,
            title: watch('title'),
            content: watch('content'),
            slug: slug
          }}
        />
      )}

      <div className={`${preview ? 'hidden' : ''} min-h-full`}>
        <ImageUploader />
        <textarea
          className="h-[38rem] w-full border-2 border-gray px-2"
          {...register('content', {
            minLength: { value: 20, message: 'Content is too short' },
            maxLength: { value: 20000, message: 'Content is too long' },
            required: { value: true, message: 'Content is required' }
          })}
        ></textarea>
      </div>
      {errors.title && <p className="font-bold text-red">{errors.title.message}</p>}
      {errors.content && <p className="font-bold text-red">{errors.content.message}</p>}
      <fieldset>
        <label>
          <input className="my-4" name="published" type="checkbox" {...register('published')} />
          Published
        </label>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-md bg-light-green p-2 text-center 
                    text-white hover:bg-green"
      >
        Save Changes
      </button>
    </form>
  )
}
