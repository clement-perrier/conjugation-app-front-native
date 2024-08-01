import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncListState } from '../interfaces/AsyncListState'
import { Batch } from '@/types/Batch'
import { FetchBatchList } from '@/services/ApiService'
import { Table } from '@/types/Table'
import addDays from '@/utils/AddDays'
import { getIncrement, getNextDayNumber } from '@/types/DayNumber'

// Define the initial state using that type
const initialState: AsyncListState<Batch> = {
  value: [],
  loading: false,
  error: null
}

export const BatchListSlice = createSlice({
  name: 'batchList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Batch>) => {
      state.value = [ ...state.value, action.payload ]
    },
    updateBatchInfo: (state, action: PayloadAction<Batch>) => {
      const { id, dayNumber, reviewingDate, tableList } = action.payload
      state.value = state.value.map(batch => 
        batch.id === id
          ? {
              ...batch, 
              dayNumber: dayNumber, 
              reviewingDate: reviewingDate,
              tableList: tableList ? tableList : batch.tableList
            } 
          : batch
      )
    }
  },
  extraReducers(builder) {
      builder
    .addCase(FetchBatchList.pending, (state) => {
        state.loading = true;
    })
    .addCase(FetchBatchList.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
    })
    .addCase(FetchBatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
    }
})

export const { add: addBatch, updateBatchInfo } = BatchListSlice.actions

export default BatchListSlice