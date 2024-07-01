import { configureStore } from '@reduxjs/toolkit'
import selectedTenseSlice from './slices/selectedTenseSlice'
import selectedVerbListSlice from './slices/selectedVerbSlice'

export const store = configureStore({
  reducer: {
    selectedTense: selectedTenseSlice.reducer,
    selectedVerbList: selectedVerbListSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch