import {configureStore} from '@reduxjs/toolkit';
import generalStateSlice from './gs-manager-slice';
import cartSlice from "./cartSlice";
import shopSlice from "./shopSlice";
import userSlice from "./userSlice";
import stripeSlice from "./stripeSlice";

const store = configureStore({
    reducer: {
        generalState: generalStateSlice,
        cart: cartSlice,
        shop: shopSlice,
        user: userSlice,
        stripe: stripeSlice
    }
})

export default store;