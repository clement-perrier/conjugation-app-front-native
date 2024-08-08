import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Batch } from '@/types/Batch'
import { defaultLearningLanguage } from '@/types/LearningLanguage'
import { defaultUserLearningLanguage } from '@/types/UserLearningLanguage'

interface BatchState {
  value: Batch
}

// Define the initial state using that type
const initialState: BatchState = {
  value: {
    id: 0,
    dayNumber: 0,
    reviewingDate: '',
    tableList: [],
    userLearningLanguage: defaultUserLearningLanguage
  }
}

export const SelectedBatchSlice = createSlice({
  name: 'selectedBatch',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSelectedBatch: (state, action: PayloadAction<Batch>) => {
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
                    conjugationItem.id === id ? { ...conjugationItem, correct } : conjugationItem
                )
            }))
        };
      }
    }
  }
})

export const { updateSelectedBatch, updateWithResult } = SelectedBatchSlice.actions

export default SelectedBatchSlice