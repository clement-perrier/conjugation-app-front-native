import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Verb } from '@/types/Verb';
import { Batch } from '@/types/Batch';
import AppSecureStore from '@/state/SecureStore';
import { jwtDecode } from 'jwt-decode';
import { updateIsAuthenticated } from '@/state/slices/isAuthtenticated';
import CustomError from '@/utils/CustomError';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { store } from '@/state/store';
import { getDispatchRef } from '@/utils/DispatchRef';
import { updateIsOnBoarding } from '@/state/slices/isOnBoardingSlice';


// Axios configuration
const API_BASE_URL = 'http://192.168.1.181:8080';

const apiService = axios.create({
    baseURL: API_BASE_URL
  });

// Functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to decode and check token expiration
function isAccessTokenExpired(token: string | null): boolean {
    if (!token) return true;
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp * 1000; // Convert expiration time to milliseconds
    return Date.now() >= exp;
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
    } else {
        try {
            const response = await apiService.post('auth/refreshToken', { token: refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = response.data;
            
            // Update the secure store with the new tokens
            await AppSecureStore.SaveItemAsync('access_token', accessToken);
            await AppSecureStore.SaveItemAsync('refresh_token', newRefreshToken);

            return accessToken;
        } catch (error) {
            await AppSecureStore.SaveItemAsync('access_token', '')
            await AppSecureStore.SaveItemAsync('refresh_token', '')
            const dispatch = getDispatchRef();
            if (dispatch) {
                dispatch(updateIsAuthenticated(false));
            }
            return null
        }
    }
}

// Axios interceptor to handle token expiration and refresh
apiService.interceptors.request.use(async (config) => {

    // List of endpoints that do not require authentication
    const noTokenEndpoints = ['auth/login', 'auth/signUp', 'auth/refreshToken'];

    if (!noTokenEndpoints.includes(config.url || '')) {

        let accessToken = await AppSecureStore.GetItemAsync('access_token');
    
        if (isAccessTokenExpired(accessToken)) {
            accessToken = await refreshToken();
        }
        if(!accessToken){
            return Promise.reject();
        }
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config;
    
}, (error) => {
    return Promise.reject(error);
});

// Requests
export const FetchUser = createAsyncThunk(
    'fetchUser',
    async () => {
        const response = await apiService.get('user?userId=1');
        return response.data;
    }
);

export const FetchLearningLanguageList = createAsyncThunk(
    'fetchLearningLanguageList',
    async () => {
        const response = await apiService.get('learningLanguages');
        return response.data;
    }
);

export const FetchTenseList = createAsyncThunk(
    'fetchTenseList',
    async (languageId: number) => {
        const response = await apiService.get(`tenses?languageId=${languageId}`);
        return response.data;
    }
);

export const FetchVerbList = createAsyncThunk(
    'fetchVerbList',
    async (languageId: number) : Promise<Verb[]> => {
        const response = await apiService.get(`verbs?languageId=${languageId}`);
        return response.data;
    }
)

export const FetchPronounList = createAsyncThunk(
    'fetchPronounList',
    async (languageId: number) => {
        const response = await apiService.get(`pronouns?languageId=${languageId}`);
        return response.data;
    }
)

export const FetchTableList = createAsyncThunk(
    'fetchTableList',
    async (languageId: number) => {
        const response = await apiService.get(`tables?languageId=${languageId}`);
        return response.data;
    }
)

export const FetchBatchList = createAsyncThunk(
    'fetchBatchList',
    async ({userId, languageId} : {userId: number, languageId: number}) => {
        const response = await apiService.get(`batchesByUserAndLanguage?userId=${userId}&languageId=${languageId}`);
        return response.data;
    }
)

export const SaveBatch = async (batch: Batch) => {
    const response = await apiService.post('newBatch', batch);
    return response.data;
}

export const UpdateBatch = async (batch: Batch) => {
    const response = await apiService.put('updateBatch', batch);
    return response.data;
}

export const UpdateUserLearningLanguageList = async (userId: number, languageId: number) => {
    const response = await apiService.put(`updateUserLearningLanguageList?userId=${userId}&learningLanguageId=${languageId}`);
    return response.data;
}

export const UpdateUserDefaultLearningLanguage = async (userId: number, languageId: number) => {
    const response = await apiService.put(`updateUserDefaultLearningLanguage?userId=${userId}&learningLanguageId=${languageId}`);
    return response.data;
}

export const RemoveBatch = async(batchId: number) => {
    const response = await apiService.delete(`deleteBatch?batchId=${batchId}`);
    return response.data;
}

export const Login = async(loginUser: LoginUser) => {
    const response = await apiService.post('auth/login', loginUser);
    return response.data;
}

export const RefreshToken = async(refreshToken: string) => {
    const response = await apiService.post('auth/refreshToken', refreshToken);
    return response.data;
}

// Interfaces
export interface LoginUser {
    email: string,
    password: string
}