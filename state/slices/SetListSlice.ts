import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncListState } from '../interfaces/AsyncListState'
import { Set } from '@/types/Set'

// Define the initial state using that type
const initialState: AsyncListState<Set> = {
  value: [],
  loading: false,
  error: null
}

export const SetListSlice = createSlice({
  name: 'setList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Set>) => {
      state.value = [ ...state.value, action.payload ]
    }
  }
})

export const { add: addSet } = SetListSlice.actions

export default SetListSlice