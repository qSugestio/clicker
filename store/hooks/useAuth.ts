import { getAuth } from 'firebase/auth'
import { useAppSelector } from './redux'

export function useAuth() {
  const { email, token, id } = useAppSelector(state => state.user)

  const auth = getAuth()
  const currentUser = auth.currentUser

  return {
    isAuth: !!email,
    email,
    token,
    id,
    currentUser,
  }
}
