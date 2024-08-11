import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const IsOnBoardingSlice = createSlice({
  name: 'isOnBoarding',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {value: false},
  reducers: {
    update: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    }, 
  }
})

export const { update: updateIsOnBoarding } = IsOnBoardingSlice.actions

export default IsOnBoardingSlice