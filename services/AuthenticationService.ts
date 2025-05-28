import AppSecureStore from "@/state/SecureStore";
import { AuthLogin, FetchLearningLanguageList, FetchUser } from "./ApiService";
import { updateIsAuthenticated } from "@/state/slices/isAuthtenticated";
import { handleFail, handleSuccess } from "@/utils/Messages";
import { store } from "@/state/store";
import { JwtResponse } from "@/types/JwtResponse";

export async function checkAuth(dispatch: any) {
  const token = await AppSecureStore.GetItemAsync('access_token');
  const userId = Number(await AppSecureStore.GetItemAsync('user_id'));
  // Token exist => user already connected
  if (token && userId) {
    LoadInitialData(dispatch, userId);
  } else {
    dispatch(updateIsAuthenticated(false))
  }
}

export const Login = async (dispatch: any, email: string, password: string, signupBefore: boolean) => {
  try {
      const jwtResponse: JwtResponse = await AuthLogin({email, password})
      SaveJwtInfoLocally(jwtResponse)
      signupBefore 
        ? handleSuccess('Sign up successful! You are now logged in.') 
        : handleSuccess('You are now logged in!')
      LoadInitialData(dispatch, jwtResponse.userId)
      return jwtResponse
    } catch (error: any) {
      // Handle errors that occur during the API call
      console.error('Authentication Service - Login() failed:', error.response?.data || error.message);
      throw error
      // return null;  // Return null or fallback value
  }
}
  
export const SaveJwtInfoLocally = async (jwtResponse: JwtResponse) => {
  await AppSecureStore.SaveItemAsync('access_token', jwtResponse.accessToken);
  await AppSecureStore.SaveItemAsync('refresh_token', jwtResponse.refreshToken);
  await AppSecureStore.SaveItemAsync('refresh_token_expiry_date', jwtResponse.refreshTokenExpiryDate);
  await AppSecureStore.SaveItemAsync('user_id', jwtResponse.userId.toString());
}

export const LoadInitialData = async (dispatch: any, userId: number) => {
  try {
    await dispatch(FetchUser(userId))
    const user = store.getState().User.value
    if (user){
      dispatch(updateIsAuthenticated(true))
      dispatch(FetchLearningLanguageList())
    } else {
      dispatch(updateIsAuthenticated(false))
    }
  } catch (error) {
    throw new Error('Error loading initial data for user');
  }
}


