import { combineReducers, configureStore } from '@reduxjs/toolkit'
import clickUp from './slice/clickUp'
import incrementalData from './slice/incrementalData '
import secUp from './slice/secUp'
import user from './slice/user'

const rootReducer = combineReducers({
  incrementalData,
  secUp,
  clickUp,
  user,
})

export const store = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']
