import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {},
    extraReducers: {}
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;