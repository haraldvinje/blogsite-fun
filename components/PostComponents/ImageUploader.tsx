import { getAuth } from 'firebase/auth'
import { ChangeEvent, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage, STATE_CHANGED } from 'lib/firebase/firebase'
import { Loader } from 'components/Loader'

export const ImageUploader = () => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState('0')
  const [downloadURL, setDownloadURL] = useState(null)

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = Array.from((e.target as HTMLInputElement).files)[0]
    const extension = file.type.split('/')[1]
    const fileRef = ref(storage, `uploads/${getAuth().currentUser.uid}/${Date.now()}.${extension}`)
    setUploading(true)

    const task = uploadBytesResumable(fileRef, file)
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
      setProgress(pct)
      task
        .then(() => getDownloadURL(fileRef))
        .then((url) => {
          setDownloadURL(url)
          setUploading(false)
        })
    })
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
            className="mr-8 max-h-16 cursor-pointer overflow-hidden 
                            text-ellipsis rounded-md bg-gray p-4 text-center font-bold hover:bg-dark-gray"
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
            className="rounded-md bg-gray p-4 font-bold hover:bg-dark-gray"
          >
            Copy Img URL
          </button>
        </div>
      )}
    </div>
  )
}
