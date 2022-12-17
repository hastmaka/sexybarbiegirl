import {createSlice} from '@reduxjs/toolkit';
import {updateLocalStore} from "../helper/Helper";
import {getAll, update} from "../helper/FirestoreApi";
import {getAllShippingOption, getCustomerData} from "../helper/stripe/StripeApi";

const stripeSlice = createSlice({
    name: 'stripe',
    initialState: {
        customer: {},
        defaultPaymentMethod: '',
        shippingRate: {},
        clientSecret: '',
        shippingOptionSelected: {},
        customerStatus: {loaded: false, loading: false},
        getCustomerDataStatus: {loaded: false, loading: false},
        getAllShippingOptionStatus: {loaded: false, loading: false},
        updatePaymentMethodStatus: {loaded: false, loading: false},
    },
    reducers: {
        setPaymentMethod(state, {payload}){
            state.defaultPaymentMethod = payload
        },
        updatePaymentMethod(state, {payload}) {
            state.customer.payment_method = [...state.customer.payment_method].filter(item => item.pm !== payload)
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

        [update.pending]: (state) => {
            state.updatePaymentMethodStatus.loading = true;
            state.updatePaymentMethodStatus.loaded = false;
        },
        [update.fulfilled]: (state, {meta, payload}) => {
            state.customer.payment_method = [...meta.arg.data]
            state.updatePaymentMethodStatus.loading = false;
            state.updatePaymentMethodStatus.loaded = true;
        },
        [update.rejected]: (state, {payload}) => {
            debugger
            state.updatePaymentMethodStatus.loaded = false;
        },
    }
});

export const stripeSliceActions = stripeSlice.actions;
export default stripeSlice.reducer;