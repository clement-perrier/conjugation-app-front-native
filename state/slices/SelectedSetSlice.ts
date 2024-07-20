import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Set } from '@/types/Set'
import { Conjugation } from '@/types/Conjugation'

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
    },
    updateWithResult: (state, action: PayloadAction<{id: number, correct: boolean}>) => {
      const {id, correct} = action.payload
      if (state.value) {
        state.value = {
            ...state.value,
            tableList: state.value.tableList.map(tableItem => ({
                ...tableItem,
                conjugationList: tableItem.conjugationList?.map(conjugationItem =>
                    conjugationItem.id === id
                        ? { ...conjugationItem, correct }
                        : conjugationItem
                )
            }))
        };
    }
    }
  }
})

export const { update: updateSelectedSet, updateWithResult } = SelectedSetSlice.actions

export default SelectedSetSlice