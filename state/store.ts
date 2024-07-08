import { configureStore } from '@reduxjs/toolkit'
import selectedTenseSlice from './slices/selectedTenseSlice'
import selectedConjugationTableListSlice from './slices/selectedConjugationTableListSlice'

export const store = configureStore({
  reducer: {
    selectedTense: selectedTenseSlice.reducer,
    selectedConjugationTableList: selectedConjugationTableListSlice.reducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch