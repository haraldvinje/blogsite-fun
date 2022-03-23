import { updateDoc, DocumentReference, DocumentData, serverTimestamp } from 'firebase/firestore'
import { slugAvailable } from 'lib/firebase/firestore'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import kebabCase from 'lodash.kebabcase'
import { Post } from 'lib/firebase/firestore'
import { PostContent } from 'components/PostComponents/PostContent'
import { ImageUploader } from 'components/PostComponents/ImageUploader'
import { getAuth } from 'firebase/auth'

type FormInputs = {
    title: string;
    content: string;
    published: boolean;
}

export const PostForm = (
    { postRef, originalPostValues, preview }:
        {
            postRef: DocumentReference<DocumentData>
            originalPostValues: Post
            preview: boolean
        }
) => {
    const { register, handleSubmit, reset, watch, formState } = useForm<FormInputs>({
        defaultValues: originalPostValues, mode: 'onChange'
    })
    const { errors } = formState
    const slug = kebabCase(watch('title'))

    const updatePost = async ({ title, content, published }) => {
        const data = { title, content, published, slug: slug, updatedAt: serverTimestamp() }
        slugAvailable(getAuth().currentUser.uid, slug).then(available => {
            if (available || title === originalPostValues.title) {
                updateDoc(postRef, data)
                toast.success("Updated successfully!")
                reset({ title, content, published })
            }
            else {
                toast.error('Title already exists. Change title.')
            }
        }).catch(() => toast.error('Something went wrong'))
    }

    return (
        <form className='min-h-[50vh]' onSubmit={handleSubmit(updatePost)}>
            <input
                defaultValue={originalPostValues.title}
                className='text-2xl font-bold mb-4 border-2 border-gray'
                {...register('title', {
                    minLength: { value: 3, message: 'Title is too short' },
                    maxLength: { value: 100, message: 'Title is too long' },
                    required: { value: true, message: 'Title is required' }
                })}
            />
            <p className='mb-4'>ID: {kebabCase(watch('title'))}</p>
            {preview && (
                <PostContent post={{
                    ...originalPostValues,
                    title: watch('title'),
                    content: watch('content'),
                    slug: slug,
                }} />
            )}

            <div className={`${preview ? "hidden" : ""} min-h-full`}>
                <ImageUploader />
                <textarea
                    className='w-full h-[38rem] px-2 border-2 border-gray'
                    {...register('content', {
                        minLength: { value: 20, message: 'Content is too short' },
                        maxLength: { value: 20000, message: 'Content is too long' },
                        required: { value: true, message: 'Content is required' }
                    })}
                >
                </textarea>
            </div>
            {errors.title && <p className='text-red font-bold'>{errors.title.message}</p>}
            {errors.content && <p className='text-red font-bold'>{errors.content.message}</p>}
            <fieldset>
                <input className='my-4' name='published' type='checkbox' {...register('published')} />
                <label>Published</label>
            </fieldset>

            <button type="submit"
                className='w-full py-2 px-2 rounded-md text-center 
                    bg-light-green hover:bg-green text-white'
            >
                Save Changes
            </button>
        </form>
    )
}