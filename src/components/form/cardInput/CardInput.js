import React, {useState} from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {styled} from "@mui/material/styles";
import {Box, Stack, Typography} from "@mui/material";
import EzLoadingBtn from "../../ezComponents/EzLoadingBtn/EzLoadingBtn";
import axios from "axios";
import {urlLocal} from "../../../helper/stripe/StripeApi";
import {useSelector} from "react-redux";

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
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return console.log('It was some problem loading Stripe');
        }

        try {
            const res = await fetch.post(`${urlLocal}create-payment-intent-to-save-a-card`, {
                customer_id: customer.customer_id,
            });
            debugger
            const clientSecret = res.data['clientSecret'];

            const {error} = await stripe.confirmSetup({
                //`Elements` instance that was used to create the Payment Element
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if (error) {
                debugger
                // This point will only be reached if there is an immediate error when
                // confirming the payment. Show error to your customer (for example, payment
                // details incomplete)
            } else {
                debugger
                // Your customer will be redirected to your `return_url`. For some payment
                // methods like iDEAL, your customer will be redirected to an intermediate
                // site first to authorize the payment, then redirected to the `return_url`.
            }
        } catch (e) {
            debugger
        }
    }
    return (
        <RootStyle>
            <Box component='form' onSubmit={onSubmit}>
                <Stack flexDirection='row' justifyContent='space-between' sx={{marginBottom: '25px'}}>
                    <Typography variant='span'>Card</Typography>
                </Stack>
                <CardElement options={CARD_ELEMENT_OPTIONS}/>
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