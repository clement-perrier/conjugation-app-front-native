import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface isAuthenticatedState {
  value: boolean | null
}

const initialState: isAuthenticatedState = {
  value: null,
};

export const IsAuthenticated = createSlice({
  name: 'IsAuthenticated',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    update: (state, action: PayloadAction<boolean | null>) => {
      state.value = action.payload
    }, 
  }
})

export const { update: updateIsAuthenticated } = IsAuthenticated.actions

export default IsAuthenticated