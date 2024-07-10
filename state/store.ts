import { configureStore } from '@reduxjs/toolkit'
import SelectedTableListSlice from './slices/SelectedTableListSlice'
import SelectedTenseSlice from './slices/SelectedTenseSlice'
import TenseListSlice from './slices/TenseListSlice'
import VerbListSlice from './slices/VerbListSlice'
import PronounListSlice from './slices/PronounListSlice'

export const store = configureStore({
  reducer: {
    selectedTense: SelectedTenseSlice.reducer,
    selectedTableList: SelectedTableListSlice.reducer,
    tenseList: TenseListSlice.reducer,
    verbList: VerbListSlice.reducer,
    pronounList: PronounListSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch