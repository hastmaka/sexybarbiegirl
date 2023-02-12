import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchAPI} from "../FetchApi";
const urlFirebase = 'https://us-central1-sexybarbiegirl-f6068.cloudfunctions.net/app/';
const urlLocal = 'http://127.0.0.1:5001/sexybarbiegirl-f6068/us-central1/app/';

export const url = urlFirebase;



//need with createAsyncThunk to update the store
export const getCustomerData = createAsyncThunk(
    'stripe/getCustomerData',
    async ({endpoint, customer, token}, {rejectWithValue})  => {
        try {
            return await fetchAPI(url, endpoint, 'GET', customer, token);
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllShippingOption = createAsyncThunk(
    'stripe/getAllShippingOption',
    async ({endpoint, token}, {rejectWithValue})  => {
        try {
            return await fetchAPI(url, endpoint, 'GET', null, token);
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);