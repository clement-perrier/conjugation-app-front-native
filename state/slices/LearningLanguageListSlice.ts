import { createSlice } from '@reduxjs/toolkit'
import { AsyncListState } from '../interfaces/AsyncListState'
import { LearningLanguage } from '@/types/LearningLanguage';
import { FetchLearningLanguageList } from '@/services/ApiService';

// Define the initial state using that type
const initialState: AsyncListState<LearningLanguage> = {
    value: [],
    loading: false,
    error: null
}

export const LearningLanguageListSlice = createSlice({
  name: 'learningLanguageList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers(builder) {
      builder
    .addCase(FetchLearningLanguageList.pending, (state) => {
        state.loading = true;
    })
    .addCase(FetchLearningLanguageList.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
    })
    .addCase(FetchLearningLanguageList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
    }
  })

export default LearningLanguageListSlice