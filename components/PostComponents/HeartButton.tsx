import React from 'react'
import { increment, DocumentReference, doc, getFirestore, writeBatch } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useDocument } from 'react-firebase-hooks/firestore'

export const HeartButton = ({ postRef }: { postRef: DocumentReference }) => {

    const user = getAuth().currentUser
    
    let heartRef: DocumentReference
    if (user) {
        heartRef = doc(getFirestore(), postRef.path, 'hearts', user.uid)
    }
    const [heartDoc] = useDocument(heartRef)

    const addHeart = async () => {
        const uid = getAuth().currentUser.uid
        const batch = writeBatch(getFirestore())

        batch.update(postRef, { heartCount: increment(1) })
        batch.set(heartRef, { uid })

        await batch.commit()
    }

    const removeHeart = async () => {
        const batch = writeBatch(getFirestore())

        batch.update(postRef, { heartCount: increment(-1) })
        batch.delete(heartRef)

        await batch.commit()
    }

    const style = "bg-gray hover:bg-dark-gray border-2 border-black px-8 py-4 rounded-md"

    return heartDoc?.exists() ? (
        <button className={style} onClick={removeHeart}>💔 Unheart</button>
    ) : (
        <button className={style} onClick={addHeart}> 💙 Heart </button>
    )
}
