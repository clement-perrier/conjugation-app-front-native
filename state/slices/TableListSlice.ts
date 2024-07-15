import { createSlice } from '@reduxjs/toolkit'
import { FetchTableList } from '@/services/ApiService'
import { AsyncListState } from '../interfaces/AsyncListState'
import { Table } from '@/types/Table'

// Define the initial state using that type
const initialState: AsyncListState<Table> = {
    value: [],
    loading: false,
    error: null
}

export const TableListSlice = createSlice({
  name: 'tableList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers(builder) {
      builder
    .addCase(FetchTableList.pending, (state) => {
        state.loading = true;
    })
    .addCase(FetchTableList.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
    })
    .addCase(FetchTableList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
    }
  })

export default TableListSlice