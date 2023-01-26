import Link from 'next/link'

const Custom404 = () => {
  return (
    <main>
      <h1 className="mb-4 text-xl font-bold">404 - That page does not seem to exist...</h1>
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
        allowFullScreen
      ></iframe>
      <Link href="/" passHref>
        <button
          className="my-4 rounded-md bg-blue py-4 
                    px-10 text-[10px] font-extrabold text-white"
        >
          Go home
        </button>
      </Link>
    </main>
  )
}

export default Custom404
