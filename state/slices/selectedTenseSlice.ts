import { createSlice } from '@reduxjs/toolkit'
import { TenseState } from '../interfaces/TenseState'


// Define the initial state using that type
const initialState: TenseState = {
  value: null
}

export const selectedTenseSlice = createSlice({
  name: 'selectedTense',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSelectedTense: (state, action) => {
      state.value = { ...action.payload }
    }
  }
})

export const { updateSelectedTense } = selectedTenseSlice.actions

export default selectedTenseSlice