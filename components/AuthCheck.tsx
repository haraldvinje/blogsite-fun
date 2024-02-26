import Link from 'next/link'
import { useContext, ReactNode } from 'react'
import { UserContext } from 'lib/context'

const AuthCheck = ({ children, fallback }: { children?: ReactNode; fallback?: ReactNode }) => {
  const { username } = useContext(UserContext)

  return username ? (
    <>{children}</>
  ) : (
    <>
      {fallback || (
        <Link href="/enter" className="text-blue">
          You must be signed in
        </Link>
      )}
    </>
  )
}

export default AuthCheck
