import { configureStore } from '@reduxjs/toolkit'
import SelectedTableListSlice from './slices/SelectedTableListSlice'
import SelectedTenseSlice from './slices/SelectedTenseSlice'
import TenseListSlice from './slices/TenseListSlice'
import VerbListSlice from './slices/VerbListSlice'
import PronounListSlice from './slices/PronounListSlice'
import SelectedBatchSlice from './slices/SelectedBatchSlice'
import BatchListSlice from './slices/BatchListSlice'
import TableListSlice from './slices/TableListSlice'
import UserSlice from './slices/UserSlice'
import LearningLanguageListSlice from './slices/LearningLanguageListSlice'
import IsOnBoardingSlice from './slices/isOnBoardingSlice'
import IsAuthenticated from './slices/isAuthtenticated'
import IsNewBatchAdded from './slices/isNewBatchAdded'

export const store = configureStore({
  reducer: {
    User: UserSlice.reducer,
    LearningLanguageList: LearningLanguageListSlice.reducer,
    selectedTense: SelectedTenseSlice.reducer,
    selectedTableList: SelectedTableListSlice.reducer,
    SelectedBatch: SelectedBatchSlice.reducer,
    tenseList: TenseListSlice.reducer,
    verbList: VerbListSlice.reducer,
    pronounList: PronounListSlice.reducer,
    TableList: TableListSlice.reducer,
    BatchList: BatchListSlice.reducer,
    IsOnBoarding: IsOnBoardingSlice.reducer,
    IsAuthenticated: IsAuthenticated.reducer,
    IsNewBatchAdded: IsNewBatchAdded.reducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch