import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
//stripe
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import LockIcon from "@mui/icons-material/Lock";
//
import {useIsScroll} from "../../helper/Hooks";
import {stripeSliceActions} from "../../store/stripeSlice";
import {getAll} from "../../helper/FirestoreApi";
import {getAllShippingOption, getCustomerData, urlFirebase, urlLocal} from "../../helper/stripe/StripeApi";
import EzHelpText from "../../components/ezComponents/EzHelpText/EzHelpText";
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import {HandeError} from "../../helper/stripe/HandeError";
import CartItemTable from "./cartItemTable/CartItemTable";
import CartSummary from "./cartSummary/CartSummary";
import CartShippingAddress from "./cartShippingAddress/CartShippingAddress";
import CartPayment from "./cartPayment/CartPayment";
import CartShippingRate from "./cartShippingRate/CartShippingRate";
import {generalSliceActions} from "../../store/gs-manager-slice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    alignItems: 'center',
    padding: '0 10px 10px 10px',
    backgroundColor: theme.palette.grey[300]
}));

const CartContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    gap: '10px',
    maxWidth: '1432px',
    width: '100%',
    [theme.breakpoints.down(786)]: {
        flexDirection: 'column'
    }
}));

const ParentContainer = styled(Stack)(() => ({
    flex: 1,
    minHeight: 'calc(100vh - 130px)',
}));

const StickyFix = styled(Stack)(() => ({
    gap: '10px',
    position: 'sticky',
    top: '120px'
}));

const ChildContainer = styled(Stack)(() => ({
    gap: '20px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
}));

//-----------------------------------------------------------------------
export default function Cart() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const {screen} = useSelector(slice => slice.generalState);
    const {user} = useSelector(slice => slice.user);
    const {
        customer,
        paymentMethod,
        shippingRate,
        shippingOptionSelected,
        customerStatus,
        getCustomerDataStatus,
        getAllShippingOptionStatus
    } = useSelector(slice => slice.stripe);
    const selectedPaymentMethod = customer?.paymentMethod?.data.filter(item => item.id === paymentMethod);
    const [loading, setLoading] = useState(false);
    const total = (user.cart.total + user.cart.total * 0.07) + (shippingOptionSelected?.amount / 100 || 0);
    const [clientSecret, setClientSecret] = useState(null);
    // debugger

    //get scroll from top for topbar shadow effect
    useIsScroll();

    //get customer id from stripe
    useEffect(_ => {
        if (!user.dummy)
            window.dispatch(getAll({
                collection: 'stripe_customers',
                filters: [{
                    field: 'email',
                    operator: '==',
                    value: user.email
                }]
            }))
    }, [user.dummy]);

    useEffect(_ => {
        if (customerStatus.loaded && !user.dummy) {
            Promise.all([
                window.dispatch(getCustomerData({endpoint: 'retrieve-customer', customer})),
                window.dispatch(getCustomerData({endpoint: 'retrieve-payment-method', customer})),
                window.dispatch(getAllShippingOption({endpoint: 'list-all-shipping-option'})),
            ]).then()
        }
    }, [customerStatus.loaded, user.dummy]);

    //update scroll position
    useIsScroll();

    const handlePay = async ({customer_id, item}) => {
        if(user.dummy) {
            return window.confirm({type: 'info', content: `You need to 'Sign in to make a Purchase'`})
                .then(res => {
                    if (res) {
                        window.dispatch(generalSliceActions.setModal({open: true, who: 'login'}))
                    }
                })
        }
        if (!user.address.length) {
            return window.displayNotification({type: 'warning', content: 'Please add some Address'})
        }
        if (!customer.paymentMethod.data.length) {
            return window.displayNotification({type: 'warning', content: 'Please add some Payment Method'})
        }
        setLoading(true);
        // setTimeout(_ => {
        //     setLoading(false);
        //     navigate('/thanks')
        // }, 1000);
        if (!stripe) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        try {
            const res = await axios.post(`${urlFirebase}create-payment-intent`, {
                customer_id: customer_id,
                item: item,
                shipping: shippingOptionSelected.amount / 100 || 0,
                // send and email after the payment go successfully, only Live Mode
                email: user.email
            });

            const clientSecret = res.data['clientSecret'];

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod
            });

            if (result.error) {
                debugger
                // Show error to your customer (e.g., insufficient funds)
                console.log(result.error.message);
            } else {
                // The payment has been processed!
                if (result.paymentIntent.status === 'succeeded') {
                    navigate('/thanks');
                    window.displayNotification({type: 'success', content: 'Payment Successfully'})
                    setLoading(false);
                    console.log('Money is in the bank!');
                }
            }
        } catch (e) {
            switch (e.response.status) {
                case 402:
                case 400:
                    HandeError(e);
                    window.displayNotification({type: 'error', content: `${e.response.data.error}`});
                    break;
                default:
                    HandeError('Another problem occurred, maybe unrelated to Stripe.');
                    break;
            }
        }
        setLoading(false)
    };

    const handleShippingRate = (shr, amount) => {
        if (shr === shippingOptionSelected.shr) return
        window.dispatch(stripeSliceActions.setShippingOption({shr, amount}))
    };

    const onSetUpFuturePaymentHandler = async () => {
        try {
            //get secure url to save a payment method
            const response = await fetch(`${urlFirebase}set-up-future-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({customer_id: customer.customer_id}),
            });
            let data = await response.json();
            window.location = data.url;
        } catch (e) {
            debugger
        }
    };

    const handleSavePaymentMethod = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return console.log('It was some problem loading Stripe');
        }

        try {
            const res = await axios.post(`${urlLocal}create-payment-intent-to-save-a-card`, {
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
    };

    return (
        <RootStyle>
            <Typography variant='span' sx={{fontWeight: 600, padding: '20px', fontSize: '20px'}}>Cart</Typography>
            <CartContainer screen={screen}>
                <CartItemTable user={user} screen={screen}/>
                <ParentContainer>
                    <StickyFix>
                        <CartSummary user={user} total={total}/>
                        <CartShippingAddress user={user} />
                        <CartPayment
                            user={user}
                            customer={customer}
                            customerStatus={customerStatus}
                            paymentMethod={paymentMethod}
                            getCustomerDataStatus={getCustomerDataStatus}
                            selectedPaymentMethod={selectedPaymentMethod}
                        />
                        <CartShippingRate
                            getAllShippingOptionStatus={getAllShippingOptionStatus}
                            shippingRate={shippingRate}
                            handleShippingRate={handleShippingRate}
                            shippingOptionSelected={shippingOptionSelected}
                        />
                        <ChildContainer>
                            <EzLoadingBtn
                                sx={{
                                    marginTop: '25px',
                                    '&.Mui-disabled': {
                                        backgroundColor: 'transparent'
                                    }
                                }}
                                onClick={_ => handlePay({customer_id: customer.customer_id, item: user.cart.item})}
                                size='large'
                                type='submit'
                                variant='outlined'
                                loading={loading}
                                disabled={!user.cart.item.length}
                            >
                                { user.cart.item.length ?
                                    `Pay  ( $${total.toFixed(2)} )` :
                                        'Cart Empty'
                                }
                            </EzLoadingBtn>
                            <EzHelpText
                                alignment='center'
                                top='-16'
                            >
                                Secure payment powered by Stripe
                                <LockIcon
                                    sx={{fontSize: '11px', paddingLeft: '2px', top: '2px', position: 'absolute'}}/>
                            </EzHelpText>
                        </ChildContainer>
                    </StickyFix>
                </ParentContainer>
            </CartContainer>
        </RootStyle>
    );
}
