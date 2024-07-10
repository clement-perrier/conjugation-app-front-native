import { createSlice } from '@reduxjs/toolkit'
import { Table } from '@/types/Table'

interface TableListState {
  value: Table[]
}

const initialState: TableListState = {
  value: []
}

export const SelectedTableListSlice = createSlice({
  name: 'selectedTableList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, ...action.payload]
    },
    remove: (state, action) => {
      state.value = state.value.filter(table => table.tense.id !== action.payload.tense.id || table.verb.id !== action.payload.verb.id)
    },
  }
})

export const {add: addSelectedConjugationTable, remove: removeSelectedConjugationTable} = SelectedTableListSlice.actions

export default SelectedTableListSlice