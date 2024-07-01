import { createSlice } from '@reduxjs/toolkit'
import VerbListState from '../interfaces/VerbListState'

// Define the initial state using that type
const initialState: VerbListState = {
  value: null
}

export const selectedVerbListSlice = createSlice({
  name: 'selectedVerbList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addVerb: (state, action) => {
      state.value = { ...state.value } + {...action.payload}
    }
  }
})

export const { addVerb } = selectedVerbListSlice.actions

export default selectedVerbListSlice