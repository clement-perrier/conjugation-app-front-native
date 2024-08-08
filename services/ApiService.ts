import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Verb } from '@/types/Verb';
import { Batch } from '@/types/Batch';

const API_BASE_URL = 'http://192.168.1.181:8080';

const apiService = axios.create({
    baseURL: API_BASE_URL,
  });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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