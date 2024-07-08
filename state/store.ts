import { configureStore } from '@reduxjs/toolkit'
import SelectedConjugationTableListSlice from './slices/SelectedConjugationTableListSlice'
import SelectedTenseSlice from './slices/SelectedTenseSlice'
import TenseListSlice from './slices/TenseListSlice'

export const store = configureStore({
  reducer: {
    selectedTense: SelectedTenseSlice.reducer,
    selectedConjugationTableList: SelectedConjugationTableListSlice.reducer,
    tenseList: TenseListSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch