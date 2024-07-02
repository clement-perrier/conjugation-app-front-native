import { createSlice } from '@reduxjs/toolkit'
import VerbListState from '../interfaces/VerbListState'
import { Verb } from '@/types/Verb'

// Define the initial state using that type
const initialState: VerbListState = {
  value: []
}

export const selectedVerbListSlice = createSlice({
  name: 'selectedVerbList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addSelectedVerb: (state, action) => {
      state.value = [...state.value, {...action.payload}]
    },
    removeSelectedVerb: (state, action) => {
      state.value = state.value.filter(verb => verb.id !== action.payload.id)
    }
  }
})

export const { addSelectedVerb: addSelectedVerb, removeSelectedVerb: removeSelectedVerb } = selectedVerbListSlice.actions

export default selectedVerbListSlice