import { FetchUser } from '@/services/ApiService'
import { LearningLanguage } from '@/types/LearningLanguage'
import { defaultUser, User } from '@/types/User'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  value: User,
  loading: boolean,
  error: string | undefined
}

// Define the initial state using that type
const initialState: UserState = {
  value: defaultUser,
  loading: false,
  error: ''
}

export const UserSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateDefaultLearningLanguage: (state, action: PayloadAction<LearningLanguage>) => {
      state.value.defaultLearningLanguage = {...action.payload}
    },
    addLearningLanguage: (state, action: PayloadAction<LearningLanguage>) => {
      state.value.learningLanguageList = [...state.value.learningLanguageList, action.payload]
    }
  },
  extraReducers(builder) {
    builder
      .addCase(FetchUser.pending, (state) => {
          state.loading = true;
      })
      .addCase(FetchUser.fulfilled, (state, action) => {
          state.loading = false;
          state.value = action.payload;
      })
      .addCase(FetchUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      });
  }
})

export const { updateDefaultLearningLanguage, addLearningLanguage } = UserSlice.actions
export default UserSlice