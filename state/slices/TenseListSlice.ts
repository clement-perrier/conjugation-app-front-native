import { createSlice } from '@reduxjs/toolkit'
import { FetchTenseList } from '@/services/ApiService'
import { Tense } from '@/types/Tense'
import { AsyncListState } from '../interfaces/AsyncListState'

// Define the initial state using that type
const initialState: AsyncListState<Tense> = {
    value: [],
    loading: false,
    error: null
}

export const TenseListSlice = createSlice({
  name: 'tenseList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers(builder) {
      builder
    .addCase(FetchTenseList.pending, (state) => {
        state.loading = true;
    })
    .addCase(FetchTenseList.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
    })
    .addCase(FetchTenseList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
    }
  })

export default TenseListSlice