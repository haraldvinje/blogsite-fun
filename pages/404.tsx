import Link from 'next/link'
import React from 'react'

const Custom404 = () => {
    return (
        <main>
            <h1 className='text-xl mb-4 font-bold'>404 - That page does not seem to exist...</h1>
            <iframe
                src='https://giphy.com/embed/l2JehQ2GitHGdVG9y'
                width="480"
                height="362"
                frameBorder="0"
                allowFullScreen
            ></iframe>
            <Link href="/">
                <button className='bg-blue-800 my-4 py-4 px-10 
                    text-white text-[10px] font-extrabold rounded-md'
                >
                    Go home
                </button>
            </Link>
        </main>
    )
}

export default Custom404