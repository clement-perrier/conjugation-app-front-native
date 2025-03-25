import { Tense } from '@/types/Tense'
import { createSlice } from '@reduxjs/toolkit'

interface TenseState {
  value: Tense | null
}

// Define the initial state using that type
const initialState: TenseState = {
  value: null
}

export const SelectedTenseSlice = createSlice({
  name: 'selectedTense',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSelectedTense: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { updateSelectedTense } = SelectedTenseSlice.actions

export default SelectedTenseSlice