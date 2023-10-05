import { IClickUp } from '@/store/slice/incrementalData '
import { IInitialState } from '@/store/slice/user'
import IUpgrade from '@/types/IUpgrade'
import { ref, set } from 'firebase/database'
import { CombinedState } from 'redux'
import { database } from './firebase'

export const dataSending = (
  state: CombinedState<{
    incrementalData: IClickUp
    secUp: IUpgrade[]
    clickUp: IUpgrade[]
    user: IInitialState
  }>
) => {
  if (state.user.id === null) return
  set(ref(database, `${state.user.id}`), {
    nickname: state.user.name,
    incrementalData: state.incrementalData,
    secUp: state.secUp,
    clickUp: state.clickUp,
  })
}
