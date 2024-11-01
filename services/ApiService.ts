import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Batch } from '@/types/Batch';
import AppSecureStore from '@/state/SecureStore';
import { jwtDecode } from 'jwt-decode';
import CustomError from '@/utils/CustomError';
import { handleFail, handleSuccess } from '@/utils/Messages';

// Axios configuration
const local = '192.168.1.181:8080'
const aws = `conjugationapp-env.eba-bfp22n3k.eu-north-1.elasticbeanstalk.com`
const API_BASE_URL = `http://${aws}`

const apiService = axios.create({
    baseURL: API_BASE_URL
  });

// Functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to decode and check token expiration
function isAccessTokenExpired(token: string | null): boolean {
    if (!token) return true;
    try {
        const decoded: any = jwtDecode(token);
        const exp = decoded.exp * 1000; // Convert expiration time to milliseconds
        return Date.now() >= exp;
    } catch (error) {
        return true
    }
    
    
}

async function isRefreshTokenExpired(){
    const expiryDate = await AppSecureStore.GetItemAsync('refresh_token_expiry_date');
    if(expiryDate) {
        return Date.now() >= new Date(expiryDate).getMilliseconds();
    }
    return true
}

// Function to refresh the token
async function refreshToken() {

    console.log('in refresh token function')
    const refreshToken = await AppSecureStore.GetItemAsync('refresh_token');

    if (!refreshToken) {
        CustomError('Refresh token is not local stored')
        return null
    } else {
        try {
            // const response = await apiService.post('auth/refreshToken', { token: refreshToken });
            const response = await AuthRefreshToken(refreshToken)
            const { accessToken, refreshToken: newRefreshToken } = response;
            
            // Update the secure store with the new tokens
            await AppSecureStore.SaveItemAsync('access_token', accessToken);
            await AppSecureStore.SaveItemAsync('refresh_token', newRefreshToken);

            return accessToken;
        } catch (error) {
            console.log('refresh token not working')
            await AppSecureStore.SaveItemAsync('access_token', '')
            await AppSecureStore.SaveItemAsync('refresh_token', '')
            return null
        }
    }
}

// Axios interceptor to handle token expiration and refresh
apiService.interceptors.request.use(async (config) => {

    // List of endpoints that do not require authentication
    // const noTokenEndpoints = ['auth/login', 'auth/signup', 'auth/refreshToken'];

    if (!config.url?.includes('auth')) {

        let accessToken = await AppSecureStore.GetItemAsync('access_token');
    
        if(!accessToken){
            return config
        }
        
        if (isAccessTokenExpired(accessToken)) {
            accessToken = await refreshToken();
        }
        
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config
    // // Apply SSL pinning using fetch from react-native-ssl-pinning
    // return new Promise((resolve, reject) => {
    //     fetch(config.baseURL + config.url, {
    //       method: config.method || 'GET',
    //       headers: config.headers,
    //       sslPinning: {
    //         certs: ['springboot'], // The certificate name without extension, placed in the appropriate directories
    //       },
    //       timeoutInterval: config.timeout,
    //       body: config.data ? JSON.stringify(config.data) : undefined,
    //     })
    //       .then((response) => {
    //         // Map the response back to axios response format
    //         return resolve({
    //           ...config,
    //           data: response.data,
    //           status: response.status,
    //         //   statusText: response.statusText,
    //           headers: response.headers,
    //         });
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    
}, (error) => {
    return Promise.reject(error);
});

// Requests
export const FetchUser = createAsyncThunk(
    'fetchUser',
    async (userId: number) => {
        try {
            const response = await apiService.get(`user?userId=${userId}`);
            return response.data;
        } catch (error) {
            handleRequestError('Logged out', error)
        }
    }
);

export const FetchLearningLanguageList = createAsyncThunk(
    'fetchLearningLanguageList',
    async () => {
        try {
            const response = await apiService.get('learningLanguages');
            return response.data;
        } catch (error) {
            handleRequestError('Fetching languages failed', error)
        }
    }
);

export const FetchTenseList = createAsyncThunk(
    'fetchTenseList',
    async (languageId: number) => {
        try {
            const response = await apiService.get(`tenses?languageId=${languageId}`);
            return response.data;
        } catch (error) {
            handleRequestError('Fetching tenses failed', error)
        }
    }
);

export const FetchVerbList = createAsyncThunk(
    'fetchVerbList',
    async (languageId: number) => {
        try {
            const response = await apiService.get(`verbs?languageId=${languageId}`);
            return response.data;
        } catch (error) {
            handleRequestError('Fetching verbs failed', error)
        }

    }
)

export const FetchPronounList = createAsyncThunk(
    'fetchPronounList',
    async (languageId: number) => {
        try {
            const response = await apiService.get(`pronouns?languageId=${languageId}`);
            return response.data;
        } catch (error) {
            handleRequestError('Fetching pronouns failed', error)
        }
    }
)

export const FetchTableList = createAsyncThunk(
    'fetchTableList',
    async (languageId: number) => {
        try {
            const response = await apiService.get(`tables?languageId=${languageId}`);
            return response.data
        } catch (error) {
            handleRequestError('Fetching conjugation tables failed', error)
        }
    }
)

export const FetchBatchList = createAsyncThunk(
    'fetchBatchList',
    async ({userId, languageId} : {userId: number, languageId: number}) => {
        try {
            const response = await apiService.get(`batchesByUserAndLanguage?userId=${userId}&languageId=${languageId}`);
            return response.data;
        } catch (error) {
            handleRequestError('Fetching repetitions failed', error)
        }
    }
    
)

export const SaveBatch = async (batch: Batch) => {
    try {
        const response = await apiService.post('newBatch', batch);
        return response.data;
    } catch (error) {
        handleRequestError('Repetition creation failed', error)
    }
}

export const UpdateBatch = async (batch: Batch) => {
    try {
        const response = await apiService.put('updateBatch', batch);
        return response.data;
    } catch (error) {
        handleRequestError('Repetition update failed', error)
    }
}

export const UpdateUserLearningLanguageList = async (userId: number, languageId: number) => {
    try {
        const response = await apiService.put(`updateUserLearningLanguageList?userId=${userId}&learningLanguageId=${languageId}`);
        return response.data;
    } catch (error) {
        handleRequestError('User update failed', error)
    }
}

export const UpdateUserDefaultLearningLanguage = async (userId: number, languageId: number) => {
    try {
        const response = await apiService.put(`updateUserDefaultLearningLanguage?userId=${userId}&learningLanguageId=${languageId}`);
        return response.data;
    } catch (error) {
        handleRequestError('User update failed', error)
    }
}

export const UpdateUserDeviceToken = async (userId: number, deviceToken: string) => {
    try {
        const response = await apiService.put(`updateUserDeviceToken?userId=${userId}&deviceToken=${deviceToken}`);
        return response.data;
    } catch (error) {
        handleRequestError('User device token update failed', error)
    }
}

export const RemoveBatch = async(batchId: number) => {
    try {
        const response = await apiService.delete(`deleteBatch?batchId=${batchId}`);
        return response.data;
    } catch (error) {
        handleRequestError('Repetition deletion failed', error)
    }
}

export const AuthLogin = async(loginUser: LoginUser) => {
    try {
        const response = await apiService.post('auth/login', loginUser);
        return response.data;
    } catch (error) {
        handleRequestError('Login failed', error)
    }
    
}

export const AuthSignup = async(loginUser: LoginUser) => {
    try {
        const response = await apiService.post('auth/signup', loginUser);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Handle HTTP errors
            if (error.response.status === 409) {
                handleFail('Signup Error', 'This email is already in use. Please try a different one.')
            } else {
                handleFail('Signup Error', error.response.data.detail || 'An unexpected error occurred.')
            }
          } else if (error.request) {
            // Handle network errors
            handleFail('Network Error', 'No response from server. Please check your network connection.')
          } else {
            // Handle other errors
            handleFail('Error', 'Something went wrong. Please try again.')
          }
    }
    
}

export const AuthRefreshToken = async(refreshToken: string) => {
    try {
        const response = await apiService.post('auth/refreshToken', {token: refreshToken});
        return response.data;
    } catch (error) {
        // handleRequestError('Refresh token error', error)
    }
}

export const AuthPasswordResetRequest = async(email: string) => {
    try {
        const response = await apiService.post(`auth/resetPassword?email=${email}`);
        handleSuccess(`A password reset code has been sent to ${email}.`)
        return response.data;
    } catch (error: any) {
        handleRequestError('Password reset request error', error)
    }
}

export const AuthChangePassword = async(changePasswordRequest: ChangePasswordRequest) => {
    try {
        const response = await apiService.post('auth/changePassword', changePasswordRequest);
        handleSuccess('Your password has been updated successfully.')
        return response.data;
    } catch (error) {
        handleRequestError('Update password request error', error)
    }
}

export const AuthLogout = async(email: string) => {
    try {
        const response = await apiService.post(`auth/logout?email=${email}`);
        handleSuccess('You are now logged out')
        return response.data;
    } catch (error) {
        handleRequestError('Log out request error', error)
    }
}

// Interfaces
export interface LoginUser {    
    email: string,
    password: string
}

export interface ChangePasswordRequest {
    code: string,
    newPassword: string
}

const handleRequestError = (message: string, error: any) => {
    console.error(message, error);
    handleFail(message, error.response?.data.description || error.message);
    return null;
}