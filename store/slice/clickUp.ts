import IUpgrade from '@/types/IUpgrade'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { config } from './config'

const initialState = [
  { title: 'ClickUp 1', price: 1, count: 0 },
  { title: 'ClickUp 2', price: 10, count: 0 },
  { title: 'ClickUp 3', price: 18, count: 0 },
  { title: 'ClickUp 5', price: 30, count: 0 },
  { title: 'ClickUp 10', price: 60, count: 0 },
  { title: 'ClickUp 20', price: 120, count: 0 },
  { title: 'ClickUp 50', price: 300, count: 0 },
  { title: 'ClickUp 100', price: 600, count: 0 },
  { title: 'ClickUp 500', price: 3000, count: 0 },
  { title: 'ClickUp 1000', price: 6000, count: 0 },
] as IUpgrade[]

const clickUpSlice = createSlice({
  name: 'ClickUp',
  initialState,
  reducers: {
    initClickUp: (state, action: PayloadAction<IUpgrade[]>) => {
      state = action.payload
    },
    purchaseClickUp: (
      state,
      action: PayloadAction<{
        title: string
        price: number
      }>
    ) => {
      const objIndex = state.findIndex(
        obj => obj.title === action.payload.title
      )
      state[objIndex].count += 1
      state[objIndex].price = Math.ceil(
        state[objIndex].price * config.multiplier
      )
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resetClickUp: state => (state = initialState),
  },
})

export default clickUpSlice.reducer
export const { initClickUp, purchaseClickUp, resetClickUp } =
  clickUpSlice.actions
