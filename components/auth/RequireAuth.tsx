/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from '@/store/hooks/redux'
import { initClickUp } from '@/store/slice/clickUp'
import { init } from '@/store/slice/incrementalData '
import { initSecUp } from '@/store/slice/secUp'
import { setUser } from '@/store/slice/user'
import { database } from '@/utils/firebase'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { child, get, ref } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import Login from './Login'

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const [isUser, setIsUser] = useState<any>()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const dataLoading = (user: User) => {
    get(child(ref(database), user.uid))
      .then(snapshot => {
        const data: object = snapshot.val()
        if (data === null) return setIsUser(user)

        dispatch(init((data as any).incrementalData))
        dispatch(initClickUp((data as any).clickUp))
        dispatch(initSecUp((data as any).secUp))
        setIsUser(user)
      })
      .catch(console.error)
  }

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, user => {
      if (user) {
        dataLoading(user)
      } else {
        return router.push('/signin')
      }
    })
  }, [dispatch, router])

  useEffect(() => {
    if (isUser === undefined) return
    dispatch(
      setUser({
        name:
          isUser.displayName === undefined ? isUser.uid : isUser.displayName,
        email: isUser.email,
        id: isUser.uid,
        token: (isUser as any).accessToken,
      })
    )
  }, [isUser])

  return isUser ? <>{children}</> : <Login />
}
