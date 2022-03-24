import { getAuth } from "firebase/auth"
import { ChangeEvent, useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage, STATE_CHANGED } from "lib/firebase/firebase"
import { Loader } from "components/Loader"

export const ImageUploader = () => {

    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState("0")
    const [downloadURL, setDownloadURL] = useState(null)

    const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = Array.from((e.target as HTMLInputElement).files)[0]
        const extension = file.type.split('/')[1]
        const fileRef = ref(storage, `uploads/${getAuth().currentUser.uid}/${Date.now()}.${extension}`)
        setUploading(true)

        const task = uploadBytesResumable(fileRef, file)
        task.on(STATE_CHANGED, (snapshot) => {
            const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            setProgress(pct);
            task
                .then(() => getDownloadURL(fileRef))
                .then((url) => {
                    setDownloadURL(url)
                    setUploading(false)
                })
        });
    }

    const copyToClipBoard = (url: string) => {
        navigator.clipboard.writeText(url)
    }

    return (
        <div className="my-6 flex">
            <Loader show={uploading} />
            {uploading && <h3>{progress}%</h3>}

            {!uploading && (
                <>
                    <label
                        className="bg-gray hover:bg-dark-gray text-center text-ellipsis 
                            overflow-hidden px-4 py-4 max-h-16 mr-8 font-bold cursor-pointer rounded-md"
                    >
                        📸 Upload Img
                        <input
                            className="hidden"
                            type="file"
                            onChange={uploadFile}
                            accept="image/x-png,image/gif,image/jpeg"
                        />
                    </label>
                </>
            )}

            {downloadURL && (
                <div className="flex flex-col">
                    <button
                        type="button"
                        onClick={() => copyToClipBoard(`![alt](${downloadURL})`)}
                        className='bg-gray hover:bg-dark-gray rounded-md px-4 py-4 font-bold'
                    >
                        Copy Img URL
                    </button>
                </div>
            )}

        </div>
    )
}