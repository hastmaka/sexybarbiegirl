import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
//stripe
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import EzNotification from "./components/ezComponents/EzNotification/EzNotification";
import EzConfirmDialog from "./components/ezComponents/EzConfirmDialog/EzConfirmDialog";
import ThemeProvider from "./theme";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Elements stripe={stripePromise}>
                    <ThemeProvider>
                        <App/>
                        <EzNotification/>
                        <EzConfirmDialog/>
                    </ThemeProvider>
                </Elements>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

