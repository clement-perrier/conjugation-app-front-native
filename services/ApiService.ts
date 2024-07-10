import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Verb } from '@/types/Verb';

const API_BASE_URL = 'http://localhost:8080';

const apiService = axios.create({
    baseURL: API_BASE_URL,
  });

export const FetchTenseList = createAsyncThunk(
    'fetchTenseList',
    async () => {
        const response = await apiService.get('tenses?languageId=1');
        return response.data;
    }
);

export const FetchVerbList = createAsyncThunk(
    'fetchVerbList',
    async () : Promise<Verb[]> => {
        const response = await apiService.get('verbs?languageId=1');
        return response.data;
    }
)

export const FetchPronounList = createAsyncThunk(
    'fetchPronounList',
    async () => {
        const response = await apiService.get('pronouns?languageId=1');
        return response.data;
    }
)