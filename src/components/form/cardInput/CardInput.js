import React, {useState} from 'react';
import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {styled} from "@mui/material/styles";
import {Box, Stack, Typography} from "@mui/material";
import EzLoadingBtn from "../../ezComponents/EzLoadingBtn/EzLoadingBtn";
import {getCustomerData, urlLocal} from "../../../helper/stripe/StripeApi";
import {useSelector} from "react-redux";
import {generalSliceActions} from "../../../store/gs-manager-slice";
import {fetchAPI} from "../../../helper/FetchApi";
import {update} from "../../../helper/firebase/FirestoreApi";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            'color': '#32325d',
            'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
            'fontSmoothing': 'antialiased',
            'fontSize': '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

const RootStyle = styled(Stack)(({theme}) => ({
    width: '400px',
    padding: '50px 30px 30px 30px'
}))

export default function CardInput() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const {customer} = useSelector(slice => slice.stripe);
    const {user} = useSelector(slice => slice.user);
    const saveCardOnStripe = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!stripe || !elements) {
            return console.log('It was some problem loading Stripe');
        }

        const {error, setupIntent} = await stripe.confirmSetup({
            //`Elements` instance that was used to create the Payment Element
            elements,
            //prevent redirect
            redirect: "if_required"
        });
        setLoading(false)
        if (error) {
            debugger
            return window.displayNotification({
                t: 'error',
                title: `${error.type}`,
                c: `${error.message} creating payment method`
            })
        } else {
            // debugger
            if(setupIntent.status === 'succeeded') {
                window.dispatch(update({
                    id: user.uid,
                    collection: 'stripe_customers',
                    data: [
                        ...customer.payment_method, {
                            main: !customer.payment_method.length,
                            pm: setupIntent.payment_method
                        }
                    ]
                }))
                window.dispatch(getCustomerData({endpoint: 'retrieve-payment-method', customer, token: user.token}));
                window.dispatch(generalSliceActions.closeModal());
                return window.displayNotification({
                    t: 'success',
                    c: 'Your Payment method was added Successfully'
                })
            }
        }

    }
    return (
        <RootStyle>
            <Box component='form' onSubmit={saveCardOnStripe}>
                <Stack flexDirection='row' justifyContent='space-between' sx={{marginBottom: '25px'}}>
                    <Typography variant='span'>Card</Typography>
                </Stack>
                {/*<CardElement options={CARD_ELEMENT_OPTIONS}/>*/}
                <PaymentElement />
                <EzLoadingBtn
                    sx={{marginTop: '25px'}}
                    color="inherit"
                    size='large'
                    type='submit'
                    variant='outlined'
                    loading={loading}
                >
                    Save Card
                </EzLoadingBtn>
            </Box>
        </RootStyle>
    );
}

