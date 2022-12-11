import {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import LockIcon from "@mui/icons-material/Lock";
//
import {useIsScroll} from "../../helper/Hooks";
import EzHelpText from "../../components/ezComponents/EzHelpText/EzHelpText";
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import CartItemTable from "./cartItemTable/CartItemTable";
import CartSummary from "./cartSummary/CartSummary";
import EzProductWidget from '../../components/ezComponents/EzProductWidget/EzProductWidget';

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

const StickyFix = styled(Stack)(({screen, theme}) => ({
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

//-----------------------------------------------------------------------
export default function Cart() {
    const navigate = useNavigate();
    const {screen} = useSelector(slice => slice.generalState);
    const {user} = useSelector(slice => slice.user);
    const {product} = useSelector(slice => slice.shop);
    const {shippingOptionSelected} = useSelector(slice => slice.stripe);
    const [loading, setLoading] = useState(false);
    const total = user.cart.item.length ? (user.cart.total + user.cart.total * 0.07) + (shippingOptionSelected?.amount / 100 || 0) : 0;
    // debugger
    //get scroll from top for topbar shadow effect
    useIsScroll();

    // const onSetUpFuturePaymentHandler = async () => {
    //     try {
    //         //get secure url to save a payment method
    //         const response = await fetch(`${urlFirebase}set-up-future-payment`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({customer_id: customer.customer_id}),
    //         });
    //         let data = await response.json();
    //         window.location = data.url;
    //     } catch (e) {
    //         debugger
    //     }
    // };

    // const handleSavePaymentMethod = async (e) => {
    //     e.preventDefault();
    //     if (!stripe || !elements) {
    //         return console.log('It was some problem loading Stripe');
    //     }
    //
    //     try {
    //         const res = await axios.post(`${urlLocal}create-payment-intent-to-save-a-card`, {
    //             customer_id: customer.customer_id,
    //         });
    //         debugger
    //         const clientSecret = res.data['clientSecret'];
    //
    //         const {error} = await stripe.confirmSetup({
    {/*            //`Elements` instance that was used to create the Payment Element*/}
    //             payment_method: {
    //                 card: elements.getElement(CardElement)
    //             }
    {/*        });*/}

    {/*        if (error) {*/}
    {/*            debugger*/}
    {/*            // This point will only be reached if there is an immediate error when*/}
    {/*            // confirming the payment. Show error to your customer (for example, payment*/}
    //             // details incomplete)
    //         } else {
    //             debugger
    //             // Your customer will be redirected to your `return_url`. For some payment
    //             // methods like iDEAL, your customer will be redirected to an intermediate
    //             // site first to authorize the payment, then redirected to the `return_url`.
    //         }
    //     } catch (e) {
    //         debugger
    //     }
    // };

    return (
        <RootStyle>
            <Typography variant='span' sx={{fontWeight: 600, padding: '20px', fontSize: '20px'}}>Cart</Typography>
            <CartContainer screen={screen}>
                <CartItemTable user={user} screen={screen}/>
                <ParentContainer>
                    <StickyFix screen={screen}>
                        <CartSummary user={user} total={total}/>
                        <ChildContainer>
                            <EzLoadingBtn
                                sx={{
                                    marginTop: '25px',
                                    '&.Mui-disabled': {
                                        backgroundColor: 'transparent'
                                    }
                                }}
                                onClick={_ => navigate('/checkout')}
                                size='large'
                                type='submit'
                                variant='outlined'
                                loading={loading}
                                disabled={!user.cart.item.length}
                            >
                                { user.cart.item.length ?
                                    'Checkout' : 'Cart Empty'
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
                        {/*recently visited*/}
                        <EzProductWidget productToRender={product} header='Recently Visited'/>
                    </StickyFix>
                </ParentContainer>
            </CartContainer>
        </RootStyle>
    );
}
