import { getAuth } from "firebase/auth"
import { ChangeEvent, useState } from "react"
import { storage, STATE_CHANGED } from "../../lib/firebase/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Loader } from "../Loader"

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
                .then((d) => getDownloadURL(fileRef))
                .then((url) => {
                    setDownloadURL(url)
                    setUploading(false)
                })
        });

    }

    return (
        <div className="my-6 flex">
            <Loader show={uploading}/>
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
                <div className="flex flex-col w-[70%]">
                    <code className="bg-white px-2 py-2 break-all w-full">{`![alt](${downloadURL})`}</code>
                    <p>Copy and paste this link!</p>
                </div>
            )}

        </div>
    )
}