import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface isNewBatchAddedState {
  value: boolean | null
}

const initialState: isNewBatchAddedState = {
  value: false,
};

export const IsNewBatchAdded = createSlice({
  name: 'IsNewBatchAdded',
  initialState: initialState,
  reducers: {
    update: (state, action: PayloadAction<boolean | null>) => {
      state.value = action.payload
    }, 
  }
})

export const { update: updateIsNewBatchAdded } = IsNewBatchAdded.actions

export default IsNewBatchAdded