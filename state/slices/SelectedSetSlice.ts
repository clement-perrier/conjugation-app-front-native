import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Set } from '@/types/Set'

interface SetState {
  value: Set | null
}

// Define the initial state using that type
const initialState: SetState = {
  value: null
}

export const SelectedSetSlice = createSlice({
  name: 'selectedSet',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Set>) => {
      state.value = action.payload
    }
  }
})

export const { update: updateSelectedSet } = SelectedSetSlice.actions

export default SelectedSetSlice