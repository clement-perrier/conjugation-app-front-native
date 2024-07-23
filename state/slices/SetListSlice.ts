import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncListState } from '../interfaces/AsyncListState'
import { Set } from '@/types/Set'
import { FetchBatchList } from '@/services/ApiService'

// Define the initial state using that type
const initialState: AsyncListState<Set> = {
  value: [],
  loading: false,
  error: null
}

export const BatchListSlice = createSlice({
  name: 'batchList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Set>) => {
      state.value = [ ...state.value, action.payload ]
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

export const { add: addSet } = BatchListSlice.actions

export default BatchListSlice