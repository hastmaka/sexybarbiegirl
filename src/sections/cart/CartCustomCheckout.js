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
import {getById} from "../../helper/FirestoreApi";
import {getRatesWithShipmentDetails, getCustomerData, url} from "../../helper/stripe/StripeApi";
import {fetchAPI} from "../../helper/FetchApi";
import {stripeSliceActions} from "../../store/stripeSlice";
import {generalSliceActions} from "../../store/gs-manager-slice";
import {HandeError} from "../../helper/stripe/HandeError";
import CartShippingAddress from "./cartShippingAddress/CartShippingAddress";
import CartPayment from "./cartPayment/CartPayment";
import CartShippingRate from "./cartShippingRate/CartShippingRate";
import {useIsScroll} from "../../helper/Hooks";
import {calculateTotalFromCheckItems, getMainPaymentMethod, openModal} from "../../helper/Helper";
import {userSliceActions} from "../../store/userSlice";
//stripe
import {useStripe} from "@stripe/react-stripe-js";
import * as FirestoreApi from "../../helper/FirestoreApi";
import Wrapper from "../../components/Wrapper/Wrapper";
import Login from "../login/Login";
import {DbToShipEngine} from "../../helper/ShipEngine";


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
        getRatesStatus
    } = useSelector(slice => slice.stripe);
    const mainPaymentMethod = customer?.paymentMethod?.data?.length && getMainPaymentMethod(customer)
    const totalFromCheckedItems = useMemo(() => {
        return user.cart.item.length ? calculateTotalFromCheckItems(user.cart.item) : 0
    }, [user.cart.item]);
    const total = (totalFromCheckedItems + totalFromCheckedItems * 0.07) +
        (totalFromCheckedItems > 100 ? 0 : user.dummy ? 0 : shippingOptionSelected?.amount || 0);
    console.log(totalFromCheckedItems)
    //get scroll from top for topbar shadow effect
    useIsScroll();

    //redirect to cart if cart is empty, prevent uer type on bar navigation
    useEffect(_ => {
        if(!user.cart.item.length) {
            navigate('/cart')
        }
    }, [user.cart.item, navigate]);

    //get customer id from stripe
    useEffect(_ => {
        if (!user.dummy)
            window.dispatch(getById({
                id: user.uid,
                collection: 'stripe_customers'
            }))
    }, [user.dummy]);

    //get customer data
    useEffect(_ => {
        if (customerStatus.loaded) {
            Promise.all([
                window.dispatch(getCustomerData({endpoint: 'retrieve-customer', customer, token: user.token})),
                window.dispatch(getCustomerData({endpoint: 'retrieve-payment-method', customer, token: user.token}))
            ]).then()
        }
    }, [customerStatus.loaded]);
    // debugger
    useEffect(_ => {
        //get rates from shipengine
        if(totalFromCheckedItems > 0 && !user.dummy)
        window.dispatch(getRatesWithShipmentDetails({
            endpoint: 'get-rates',
            data:{
                rateOptions: {
                    carrierIds: ['se-4087584']//usps
                },
                shipment: {
                    validateAddress: "no_validation",
                    shipTo: { ...DbToShipEngine(user.address.filter(item => item.main))},
                    shipFrom: {
                        companyName: "PartyLifestyle",
                        name: "Yanet",
                        phone: "305-748-1194",
                        addressLine1: "1476 reef redge ct",
                        // addressLine2: "Suite 300",
                        cityLocality: "Las Vegas",
                        stateProvince: "NV",
                        postalCode: "89128",
                        countryCode: "US",
                        addressResidentialIndicator: "no",
                    },
                    //make the package calculation
                    packages: [{
                        weight: {
                            value: 1,
                            unit: "pound",
                        },
                        dimensions: {
                            length: 10,
                            width: 5,
                            height: 2,
                            unit: "inch"
                        }
                    }],
                }
            },
            token: user.token}))
        //dep cart updated
    }, [user.cart.item])


    //get client secret from stripe
    useEffect(_ => {
        if(clientSecret) {
            return
        }
        const getClientSecretFromStripe = async () => {
            try {
                const res = await fetchAPI(
                    url,
                    'create-payment-intent-to-save-a-card',
                    'POST',
                    {customer_id: customer.customer_id},
                    user.token
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
        let itemChecked = cart.item.filter(item => item.checked),
            itemUnChecked = cart.item.filter(item => !item.checked);
        if(user.dummy) {
            return window.confirm({t: 'info', c: `You need to 'Sign in to make a Purchase'`})
                .then(res => {
                    if (res) {
                        openModal(<Login modal/>)
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
            const res = await fetchAPI(url, 'create-payment-intent', 'POST', {
                customer_id: customer_id,
                item: itemChecked,
                shipping: shippingOptionSelected.amount / 100 || 0,
                // send and email after the payment go successfully, only Live Mode
                email: user.email,
                tempAddress: user.address.filter(item => item.main),
                userId: user.uid
            }, user.token)
            const result = await stripe.confirmCardPayment(res.clientSecret, {
                payment_method: mainPaymentMethod[0].id
            });

            if (result.error) {
                debugger
                // Show error to your customer (e.g., insufficient funds)
                console.log(result.error.message);
            } else {
                // The payment has been processed!
                if (result.paymentIntent.status === 'succeeded') {
                    //update the cart items deleting the ones which was purchased
                    //create a temp order to give an instant feedback to the user then sync with db
                    const {receipt_email, amount, created, shipping} = result.paymentIntent;
                    const {item, ...rest} = cart;
                    FirestoreApi.createOrder({
                        data: {
                            userId: user.uid,
                            receipt_email,
                            amount,
                            last_four: mainPaymentMethod[0].card.last4,
                            network: mainPaymentMethod[0].card.brand,
                            create_at: created,
                            customer_id: customer.customer_id,
                            order_status: 'processing',
                            shipping: {
                                address: {...shipping.address},
                                first_name: shipping.name.split(' ')[0],
                                last_name: shipping.name.split(' ')[1],
                                phone: shipping.phone
                            },
                            item: [...itemChecked]
                        },
                        id: res.idToCreateTheOrder
                    })
                    window.dispatch(userSliceActions.updateCartAfterPurchase({
                        cart: {
                            item: [...itemUnChecked],
                            ...rest
                        }
                    }));
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
                            clientSecret={clientSecret}
                            customerStatus={customerStatus}
                            getCustomerDataStatus={getCustomerDataStatus}
                            mainPaymentMethod={mainPaymentMethod}
                        />
                        <CartShippingRate
                            user={user}
                            getRatesStatus={getRatesStatus}
                            shippingRate={shippingRate}
                            handleShippingRate={handleShippingRate}
                            shippingOptionSelected={shippingOptionSelected}
                            totalFromCheckedItems={totalFromCheckedItems}
                        />
                        <Wrapper sx={{gap: '20px', padding: '20px'}}>
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
                        </Wrapper>
                    </StickyFix>
                </ParentContainer>
            </CartContainer>
        </RootStyle>
    );
}
