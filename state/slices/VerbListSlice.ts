import { createSlice } from '@reduxjs/toolkit'
import { FetchVerbList } from '@/services/ApiService'
import { AsyncListState } from '../interfaces/AsyncListState'
import { Verb } from '@/types/Verb'

// Define the initial state using that type
const initialState: AsyncListState<Verb> = {
    value: [],
    loading: false,
    error: null
}

export const VerbListSlice = createSlice({
  name: 'verbList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSelectableVerbs: (state, action) => {
        state.value = action.payload
    }
  },
  extraReducers(builder) {
      builder
    .addCase(FetchVerbList.pending, (state) => {
        state.loading = true;
    })
    .addCase(FetchVerbList.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload.map(verb => ({...verb, selected: false}));
    })
    .addCase(FetchVerbList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
    }
  })

export const { updateSelectableVerbs } = VerbListSlice.actions

export default VerbListSlice