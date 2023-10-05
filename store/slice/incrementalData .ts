import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IClickUp {
  uniAmount: number
  perClick: number
  uniSec: number
}

const initialState = { uniAmount: 0, perClick: 1, uniSec: 0 } as IClickUp

const incrementalData = createSlice({
  name: 'IncrementalData',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<IClickUp>) => {
      const { uniAmount, perClick, uniSec } = action.payload
      state.uniAmount = uniAmount
      state.perClick = perClick
      state.uniSec = uniSec
    },
    income: (state, action: PayloadAction<number>) => {
      state.uniAmount += action.payload
    },
    expense: (state, action: PayloadAction<number>) => {
      state.uniAmount -= action.payload
    },
    perClickUp: (state, action: PayloadAction<number>) => {
      state.perClick += action.payload
    },
    uniSecUp: (state, action: PayloadAction<number>) => {
      state.uniSec += action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resetData: state => (state = initialState),
  },
})

export default incrementalData.reducer
export const { init, income, expense, perClickUp, uniSecUp, resetData } =
  incrementalData.actions
