import Link from 'next/link'
import { useContext } from 'react'
import { ReactNode } from 'react-markdown/lib/react-markdown'
import { UserContext } from 'lib/context'

const AuthCheck = ({ children, fallback }: { children?: ReactNode; fallback?: ReactNode }) => {
  const { username } = useContext(UserContext)

  return username ? (
    <>{children}</>
  ) : (
    <>
      {fallback || (
        <Link href="/enter">
          <a className="text-blue">You must be signed in</a>
        </Link>
      )}
    </>
  )
}

export default AuthCheck
