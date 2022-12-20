import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import LockIcon from "@mui/icons-material/Lock";
//
import CartItemTable from "./cartItemTable/CartItemTable";
import CartSummary from "./cartSummary/CartSummary";
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import EzHelpText from "../../components/ezComponents/EzHelpText/EzHelpText";
import {getAll, updateCartApi} from "../../helper/FirestoreApi";
import {getAllShippingOption, getCustomerData, urlFirebase, urlLocal} from "../../helper/stripe/StripeApi";
import {fetchAPI} from "../../helper/FetchApi";
import {stripeSliceActions} from "../../store/stripeSlice";
import {generalSliceActions} from "../../store/gs-manager-slice";
import {HandeError} from "../../helper/stripe/HandeError";
import CartShippingAddress from "./cartShippingAddress/CartShippingAddress";
import CartPayment from "./cartPayment/CartPayment";
import CartShippingRate from "./cartShippingRate/CartShippingRate";
import {useIsScroll} from "../../helper/Hooks";
//stripe
import {useStripe} from "@stripe/react-stripe-js";
import {
    calculateTotalFromCheckItems,
    prepareCheckedItemToServer,
    updateCart,
    updateLocalStore
} from "../../helper/Helper";
import {userSliceActions} from "../../store/userSlice";


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

const ParentContainer = styled(Stack)(({theme}) => ({
    flex: 1,
    minHeight: 'calc(100vh - 130px)',
    [theme.breakpoints.down(786)]: {
        minHeight: '100%',
    }
}));

const StickyFix = styled(Stack)(({theme}) => ({
    gap: '10px',
    position: 'sticky',
    top: '120px',
    [theme.breakpoints.down(786)]: {
        position: 'relative',
        top: 0,
    }
}));

const ChildContainer = styled(Stack)(() => ({
    gap: '20px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
}));

//----------------------------------------------------------------

export default function CartCustomCheckout() {
    const stripe = useStripe();
    const navigate = useNavigate();
    const {user} = useSelector(slice => slice.user);
    const [loading, setLoading] = useState(false);
    const {screen} = useSelector(slice => slice.generalState);
    const {
        customer,
        clientSecret,
        shippingRate,
        shippingOptionSelected,
        customerStatus,
        getCustomerDataStatus,
        getAllShippingOptionStatus
    } = useSelector(slice => slice.stripe);
    const [mainPaymentMethod, setMainPaymentMethod] = useState(null)
    // debugger
    const totalFromCheckedItems = useMemo(() => {
        return !!user.cart.item.length ? calculateTotalFromCheckItems(user.cart.item) : 0
    }, [user.cart.item]);
    const total = (totalFromCheckedItems + totalFromCheckedItems * 0.07) + (shippingOptionSelected?.amount / 100 || 0);
    // debugger
    //get scroll from top for topbar shadow effect
    useIsScroll();

    //main payment method
    useEffect(_ => {
        if(customer?.paymentMethod?.data?.length) {
            let main = customer.paymentMethod.data.filter(item => {
                if(customer.payment_method.length) {
                    let main = customer.payment_method.find(item => item.main).pm;
                    return main === item.id
                } else {
                    return item
                }

            });
            setMainPaymentMethod(main)
        }
    }, [customer])


    //redirect to cart if cart is empty, prevent uer type on bar navigation
    useEffect(_ => {
        if(!user.cart.item.length) {
            navigate('/cart')
        }
    }, [user.cart.item, navigate]);

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

    //get customer data
    useEffect(_ => {
        if (customerStatus.loaded) {
            Promise.all([
                window.dispatch(getCustomerData({endpoint: 'retrieve-customer', customer})),
                window.dispatch(getCustomerData({endpoint: 'retrieve-payment-method', customer})),
                window.dispatch(getAllShippingOption({endpoint: 'list-all-shipping-option'})),
            ]).then()
        }
    }, [customerStatus.loaded]);

    //get client secret from stripe
    useEffect(_ => {
        if(clientSecret) {
            return
        }
        const getClientSecretFromStripe = async () => {
            try {
                const res = await fetchAPI(
                    urlLocal,
                    'create-payment-intent-to-save-a-card',
                    'POST',
                    {customer_id: customer.customer_id}
                )
                window.dispatch(stripeSliceActions.setSecret(res.client_secret))
            } catch (e) {
                window.displayNotification({
                    t: 'error',
                    c: `Some Error ${e}`
                })
            }
        }
        if(customerStatus.loaded) {
            getClientSecretFromStripe()
                .then()
        }
    }, [customerStatus, clientSecret]);

    const handleShippingRate = (shr, amount) => {
        if (shr === shippingOptionSelected.shr) return
        window.dispatch(stripeSliceActions.setShippingOption({shr, amount}))
    };

    const handlePay = async ({customer_id, cart}) => {
        let itemChecked = prepareCheckedItemToServer(cart.item),
            itemUnChecked = cart.item.filter(item => !item.checked);
        if(user.dummy) {
            return window.confirm({t: 'info', c: `You need to 'Sign in to make a Purchase'`})
                .then(res => {
                    if (res) {
                        window.dispatch(generalSliceActions.setModal({open: true, who: 'login'}))
                    }
                })
        }
        if (!user.address.length) {
            return window.displayNotification({
                t: 'warning',
                c: 'Please add some Address'
            });
        }
        if (!customer.paymentMethod.data.length) {
            return window.displayNotification({
                t: 'warning',
                c: 'Please add some Payment Method'
            });
        }
        if (!stripe) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);
        try {
            const res = await fetchAPI(urlLocal, 'create-payment-intent', 'POST', {
                customer_id: customer_id,
                item: itemChecked,
                shipping: shippingOptionSelected.amount / 100 || 0,
                // send and email after the payment go successfully, only Live Mode
                email: user.email,
                tempAddress: user.address.filter(item => item.main),
                userId: user.uid
            })
            const result = await stripe.confirmCardPayment(res.clientSecret, {
                payment_method: mainPaymentMethod[0].id
            });

            if (result.error) {
                debugger
                // Show error to your customer (e.g., insufficient funds)
                console.log(result.error.message);
            } else {
                // debugger
                // The payment has been processed!
                if (result.paymentIntent.status === 'succeeded') {
                    //update the cart items deleting the ones which was purchased
                    const {item, ...rest} = cart;
                    window.dispatch(userSliceActions.updateCartAfterPurchase({cart: {item: [...itemUnChecked], ...rest}}));
                    navigate('/thanks');
                    setLoading(false);
                }
            }
        } catch (e) {
            debugger
            switch (e.response.status) {
                case 402:
                case 400:
                    HandeError(e);
                    window.displayNotification({
                        t: 'error',
                        c: `${e.response.data.error}`
                    });
                    break;
                default:
                    HandeError('Another problem occurred, maybe unrelated to Stripe.');
                    break;
            }
        }
        setLoading(false)
    };

    return (
        <RootStyle>
            <Typography variant='span' sx={{fontWeight: 600, padding: '20px', fontSize: '20px'}}>CheckOut</Typography>
            <CartContainer screen={screen}>
                <CartItemTable user={user} screen={screen}/>
                <ParentContainer>
                    <StickyFix>
                        <CartSummary user={user} totalFromCheckedItems={totalFromCheckedItems} total={total}/>
                        <CartShippingAddress user={user} />
                        <CartPayment
                            user={user}
                            customer={customer}
                            customerStatus={customerStatus}
                            getCustomerDataStatus={getCustomerDataStatus}
                            mainPaymentMethod={mainPaymentMethod}
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
                                onClick={_ => {
                                    if(!user.cart.quantity) {
                                        window.displayNotification({
                                            t: 'info',
                                            c: 'Please select at least one item to Checkout'
                                        })
                                    } else {
                                        handlePay({
                                            customer_id: customer.customer_id,
                                            cart: user.cart
                                        }).then()
                                    }
                                }}
                                size='large'
                                type='submit'
                                variant='outlined'
                                loading={loading}
                                disabled={!user.cart.item.length}
                            >
                                {`Pay  ( $${total.toFixed(2)} )`}
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
