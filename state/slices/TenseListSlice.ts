import { createSlice } from '@reduxjs/toolkit'
import { TenseState } from '../interfaces/TenseState'
import { FetchTenseList } from '@/services/ApiService'

interface TenseListState {
    value: any[],
    loading: boolean,
    error: string | undefined | null
}
// Define the initial state using that type
const initialState: TenseListState = {
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