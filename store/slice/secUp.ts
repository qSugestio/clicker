import IUpgrade from '@/types/IUpgrade'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { config } from './config'

const initialState = [
  { title: 'SecUp 1', price: 30, count: 0 },
  { title: 'SecUp 2', price: 60, count: 0 },
  { title: 'SecUp 3', price: 90, count: 0 },
  { title: 'SecUp 5', price: 300, count: 0 },
  { title: 'SecUp 10', price: 600, count: 0 },
  { title: 'SecUp 20', price: 1500, count: 0 },
  { title: 'SecUp 50', price: 3000, count: 0 },
  { title: 'SecUp 75', price: 4500, count: 0 },
  { title: 'SecUp 100', price: 15000, count: 0 },
  { title: 'SecUp 500', price: 30000, count: 0 },
] as IUpgrade[]

const secUpSlice = createSlice({
  name: 'SecUp',
  initialState,
  reducers: {
    initSecUp: (state, action: PayloadAction<IUpgrade[]>) => {
      state = action.payload
    },
    purchaseSecUp: (
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
    resetSecUp: state => (state = initialState),
  },
})

export default secUpSlice.reducer
export const { initSecUp, purchaseSecUp, resetSecUp } = secUpSlice.actions
