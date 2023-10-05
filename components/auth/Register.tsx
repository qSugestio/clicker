/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from '@/components/Form'
import { useAppDispatch } from '@/store/hooks/redux'
import { setUser } from '@/store/slice/user'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { MouseEvent, useEffect } from 'react'

const Register = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            id: user.uid,
            token: (user as any).accessToken,
          })
        )
        router.push('/')
      }
    })
  }, [dispatch, router])

  const handleClick = (
    email: string,
    password: string,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    {
      e.preventDefault()

      const auth = getAuth()

      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          dispatch(
            setUser({
              name: user.displayName,
              email: user.email,
              id: user.uid,
              token: (user as any).accessToken,
            })
          )
        })
        .catch(err => {
          console.error(err)
          const email = document.getElementById('email')
          const password = document.getElementById('password')
          const errorEmail = document.getElementById('error-email')
          const errorPassword = document.getElementById('error-password')
          console.dir(err)
          if (
            password !== null &&
            email !== null &&
            errorEmail !== null &&
            errorPassword !== null
          ) {
            switch (err.code) {
              case 'auth/weak-password':
                errorPassword.innerText =
                  'Пароль должен состоять не менее чем из 6 символов'
                errorEmail.innerText = ''
                ;(
                  document.getElementById('button') as HTMLButtonElement
                ).disabled = false
                break
              case 'auth/missing-password':
                errorPassword.innerText = 'Введите пароль'
                errorEmail.innerText = ''
                ;(
                  document.getElementById('button') as HTMLButtonElement
                ).disabled = false
                break
              case 'auth/invalid-email':
                errorEmail.innerText = 'Введите email'
                errorPassword.innerText = ''
                ;(
                  document.getElementById('button') as HTMLButtonElement
                ).disabled = false
                break
              case 'auth/email-already-in-use':
                errorEmail.innerText =
                  'Пользователь с таким email уже зарегистрирован'
                errorPassword.innerText = ''
                ;(
                  document.getElementById('button') as HTMLButtonElement
                ).disabled = false
                break
            }
          }
        })
    }
  }

  return (
    <div>
      <Form title='sign up' handleClick={handleClick} />
    </div>
  )
}

export default Register
