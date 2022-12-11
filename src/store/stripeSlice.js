import {createSlice} from '@reduxjs/toolkit';
import {updateLocalStore} from "../helper/Helper";
import {getAll} from "../helper/FirestoreApi";
import {getAllShippingOption, getCustomerData} from "../helper/stripe/StripeApi";

const stripeSlice = createSlice({
    name: 'stripe',
    initialState: {
        customer: {},
        paymentMethod: '',
        shippingRate: {},
        clientSecret: '',
        shippingOptionSelected: {},
        customerStatus: {loaded: false, loading: false},
        getCustomerDataStatus: {loaded: false, loading: false},
        getAllShippingOptionStatus: {loaded: false, loading: false}
    },
    reducers: {
        setPaymentMethod(state, {payload}){
            state.paymentMethod = payload
        },
        setShippingOption(state, {payload}) {
            state.shippingOptionSelected = payload
        },
        setSecret(state, {payload}){
            state.clientSecret = payload
        }
    },
    extraReducers: {
        [getAll.pending]: (state) => {
            state.customerStatus.loading = true;
        },
        [getAll.fulfilled]: (state, {meta, payload}) => {
            switch (meta.arg.collection) {
                case 'stripe_customers':
                    state.customerStatus.loading = false;
                    state.customerStatus.loaded = true;
                    state.customer = {...payload}
                    // debugger
                    break;
                default:
                    return
            }
        },
        [getAll.rejected]: (state, {payload}) => {
            debugger
            state.message = payload;
            state.userStatus.loaded = false;
        },

        [getCustomerData.pending]: (state) => {
            state.getCustomerDataStatus.loading = true;
            state.getCustomerDataStatus.loaded = false;
        },
        [getCustomerData.fulfilled]: (state, {meta, payload}) => {
            switch (meta.arg.endpoint) {
                case 'retrieve-customer':
                    state.customer = {
                        ...state.customer,
                        ...payload.customer
                    }
                    break;
                case 'retrieve-payment-method':
                    state.customer.paymentMethod = {...payload.paymentMethods}
                    state.paymentMethod = payload.paymentMethods.data.length ? payload.paymentMethods.data[0].id : ''
                    state.getCustomerDataStatus.loading = false;
                    state.getCustomerDataStatus.loaded = true;
                    updateLocalStore('stripe', {...state.customer}, 'stripe')
                    break;
                default:
                    return

            }
        },
        [getCustomerData.rejected]: (state, {payload}) => {
            debugger
            state.getCustomerDataStatus.loaded = false;
        },

        [getAllShippingOption.pending]: (state) => {
            state.getAllShippingOptionStatus.loading = true;
            state.getAllShippingOptionStatus.loaded = false;
        },
        [getAllShippingOption.fulfilled]: (state, {payload}) => {
            state.shippingRate = {...payload.shippingRates};
            state.getAllShippingOptionStatus.loading = false;
            state.getAllShippingOptionStatus.loaded = true;
        },
        [getAllShippingOption.rejected]: (state, {payload}) => {
            debugger
            state.getAllShippingOptionStatus.loaded = false;
        },
    }
});

export const stripeSliceActions = stripeSlice.actions;
export default stripeSlice.reducer;