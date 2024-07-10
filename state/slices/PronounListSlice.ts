import { createSlice } from '@reduxjs/toolkit'
import { FetchPronounList } from '@/services/ApiService'
import { AsyncListState } from '../interfaces/AsyncListState'
import { Pronoun } from '@/types/Pronoun'

// Define the initial state using that type
const initialState: AsyncListState<Pronoun> = {
    value: [],
    loading: false,
    error: null
}

export const PronounListSlice = createSlice({
  name: 'pronounList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers(builder) {
      builder
    .addCase(FetchPronounList.pending, (state) => {
        state.loading = true;
    })
    .addCase(FetchPronounList.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
    })
    .addCase(FetchPronounList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
    }
  })

export default PronounListSlice