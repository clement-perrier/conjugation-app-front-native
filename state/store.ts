import { configureStore } from '@reduxjs/toolkit'
import SelectedTableListSlice from './slices/SelectedTableListSlice'
import SelectedTenseSlice from './slices/SelectedTenseSlice'
import TenseListSlice from './slices/TenseListSlice'
import VerbListSlice from './slices/VerbListSlice'
import PronounListSlice from './slices/PronounListSlice'
import SelectedSetSlice from './slices/SelectedSetSlice'
import SetListSlice from './slices/SetListSlice'
import TableListSlice from './slices/TableListSlice'

export const store = configureStore({
  reducer: {
    selectedTense: SelectedTenseSlice.reducer,
    selectedTableList: SelectedTableListSlice.reducer,
    SelectedSet: SelectedSetSlice.reducer,
    tenseList: TenseListSlice.reducer,
    verbList: VerbListSlice.reducer,
    pronounList: PronounListSlice.reducer,
    TableList: TableListSlice.reducer,
    setList: SetListSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch