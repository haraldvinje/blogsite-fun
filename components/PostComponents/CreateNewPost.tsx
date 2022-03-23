import { doc, serverTimestamp, setDoc, getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import kebabCase from 'lodash.kebabcase'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "lib/context"
import { FormEvent } from "react"
import { slugAvailable } from "lib/firebase/firestore"

export const CreateNewPost = () => {
    const router = useRouter()
    const { username } = useContext(UserContext)
    const [title, setTitle] = useState('')
    const slug = encodeURI(kebabCase(title))
    const isValid = title === title.trim() && title.length > 3 && title.length < 100

    const createPost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const uid = getAuth().currentUser.uid
        const ref = doc(getFirestore(), 'users', uid, 'posts', uuidv4())
        const cleanSlug = slug.trim()
        slugAvailable(uid, cleanSlug).then(available => {
            if (available) {
                const data = {
                    title,
                    slug: cleanSlug,
                    uid,
                    username,
                    published: false,
                    content: '# hello world!',
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                    heartCount: 0
                }
                setDoc(ref, data)
                toast.success('Post created')
                router.push(`/admin/${cleanSlug}`)
            }
            else {
                toast.error('Title already exists. Change title.')
            }
        }).catch(() => toast.error('Something went wrong'))
    }


    return (
        <form onSubmit={createPost}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My New Article!"
                className="w-full px-2 text-[40px] outline-0 my-2"
            />
            <p>
                <strong>ID: </strong>{slug}
            </p>
            <button type="submit" disabled={!isValid}
                className={`my-2 py-4 px-8 bg-light-green rounded-md text-white
                    ${!isValid ? "bg-dark-green cursor-not-allowed" : "hover:bg-green"}`}
            >
                Create New Post
            </button>
        </form>

    )

}