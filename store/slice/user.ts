import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IInitialState {
  name: string | null
  email: string | null
  token: string | null
  id: string | null
}
const initialState = {
  name: null,
  email: null,
  token: null,
  id: null,
} as IInitialState

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IInitialState>) {
      if (
        action.payload.email !== null &&
        action.payload.token !== null &&
        action.payload.id !== null
      ) {
        state.name = action.payload.name
        state.email = action.payload.email
        state.token = action.payload.token
        state.id = action.payload.id
      }
    },
    removeUser(state) {
      state.name = null
      state.email = null
      state.token = null
      state.id = null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
