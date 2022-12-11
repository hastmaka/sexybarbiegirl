import {createSlice} from '@reduxjs/toolkit';

const generalStateSlice = createSlice({
    name: 'generalState',
    initialState: {
        screen: '',
        scrollTop: 0,
        modal: {
            open: false,
            who: ''
        },
        notification: {
            open: false,
            t: 'info',
            title: '',
            c: '',
            timeout: 0
        },
        confirmDialog: {
            open: false,
            title: '',
            content: '',
        },

        //views
        profileView: {ready: false}
    },
    reducers: {
        setScreen(state, {payload}) {
            state.screen = payload
        },
        setScroll(state, {payload}){
            state.scrollTop = payload
        },
        setModal(state, {payload}) {
            state.modal = {...state.modal, ...payload};
        },
        closeModal(state){

        },
        showNotification(state, {payload}) {
            state.notification = {
                ...state.notification,
                open: true,
                timeout: payload.important ? 10000 : 3000,
                ...payload
            }
        },
        closeNotification(state) {
            state.notification = {
                ...state.notification,
                open: false
            }
        },
        showConfirmDialog(state, {payload}) {
            state.confirmDialog = {
                ...state.confirmDialog,
                open: true,
                ...payload
            }
        },
        closeConfirmDialog(state) {
            state.confirmDialog = {
                ...state.confirmDialog,
                open: false,
            }
        }
    },
    extraReducers: {}
})

export const generalSliceActions = generalStateSlice.actions;
export default generalStateSlice.reducer;

