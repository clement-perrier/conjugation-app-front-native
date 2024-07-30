import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncListState } from '../interfaces/AsyncListState'
import { Batch } from '@/types/Batch'
import { FetchBatchList } from '@/services/ApiService'
import { hasMistake, Table } from '@/types/Table'
import TableList from '@/components/layout/TableList'
import addDays from '@/utils/AddDays'

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
    updateBatchInfo: (state, action: PayloadAction<{ batchId: number, isCorrect?: boolean, increment?: number, newTableList?: Table[]}>) => {
      const { batchId, isCorrect, increment, newTableList } = action.payload
      state.value = state.value.map(batch => 
        batch.id === batchId
          ? {
              ...batch, 
              dayNumber: isCorrect && increment ? batch.dayNumber + increment : batch.dayNumber, 
              reviewingDate: increment ? addDays(batch.reviewingDate, increment) : batch.reviewingDate,
              tableList: newTableList ? newTableList : batch.tableList
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