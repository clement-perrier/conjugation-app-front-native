import { createSlice } from '@reduxjs/toolkit'
import { ConjugationTable } from '@/types/ConjugationTable'

interface ConjugationListState {
  value: ConjugationTable[]
}
// Define the initial state using that type
const initialState: ConjugationListState = {
  value: []
}

export const SelectedConjugationTableListSlice = createSlice({
  name: 'selectedConjugationTableList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, ...action.payload]
    },
    remove: (state, action) => {
      state.value = state.value.filter(table => (table.id !== action.payload.id))
    },
  }
})

export const {add: addSelectedConjugationTable, remove: removeSelectedConjugationTable} = SelectedConjugationTableListSlice.actions

export default SelectedConjugationTableListSlice