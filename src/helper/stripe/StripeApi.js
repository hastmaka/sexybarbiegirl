import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchAPI} from "../FetchApi";
export const urlFirebase = 'https://us-central1-sexybarbiegirl-f6068.cloudfunctions.net/app/';
export const urlLocal = 'http://127.0.0.1:5001/sexybarbiegirl-f6068/us-central1/app/';

//need with createAsyncThunk to update the store
export const getCustomerData = createAsyncThunk(
    'stripe/getCustomerData',
    async ({endpoint, customer}, {rejectWithValue})  => {
        try {
            return await fetchAPI(urlLocal, endpoint, 'GET', customer);
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllShippingOption = createAsyncThunk(
    'stripe/getAllShippingOption',
    async ({endpoint}, {rejectWithValue})  => {
        try {
            return await fetchAPI(urlLocal, endpoint, 'GET');
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);