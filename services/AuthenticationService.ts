import AppSecureStore from "@/state/SecureStore";
import { AuthLogin, FetchLearningLanguageList, FetchUser } from "./ApiService";
import { updateIsAuthenticated } from "@/state/slices/isAuthtenticated";
import { handleFail, handleSuccess } from "@/utils/Messages";

export const Login = async (dispatch: any, email: string, password: string, signupBefore: boolean) => {
    try {
      
        const jwtResponse = await AuthLogin({email, password})
        await AppSecureStore.SaveItemAsync('access_token', jwtResponse.accessToken);
        await AppSecureStore.SaveItemAsync('refresh_token', jwtResponse.refreshToken);
        await AppSecureStore.SaveItemAsync('refresh_token_expiry_date', jwtResponse.refreshTokenExpiryDate);
        await AppSecureStore.SaveItemAsync('user_id', jwtResponse.userId.toString());
        signupBefore ? handleSuccess('Sign up successful! You are now logged in.') : handleSuccess('You are now logged in!')
        loadInitialData(dispatch, jwtResponse.userId)
        return jwtResponse
  
      } catch (error: any) {
  
        // Handle errors that occur during the API call
        console.log(error)
         console.error('Login failed:', error.response?.data || error.message);  
        handleFail('Login failed', error.response?.data.description || error.message);

        // You might throw the error again or handle it in another way
        // throw new Error(error.response?.data?.message || 'Login failed, please try again.');
        return null
      }
}

export const loadInitialData = (dispatch: any, userId: number) => {
  dispatch(updateIsAuthenticated(true));
  dispatch(FetchUser(userId))
  dispatch(FetchLearningLanguageList())
}
