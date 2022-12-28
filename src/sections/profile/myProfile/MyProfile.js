import {useSelector} from "react-redux";
import {useEffect} from "react";
// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import MyAddress from "./myAddress/MyAddress";
import MyPaymentMethod from "./myPaymentMethod/MyPaymentMethod";
import {getCustomerData, url} from "../../../helper/stripe/StripeApi";
import {getAll, getById} from "../../../helper/FirestoreApi";
import {fetchAPI} from "../../../helper/FetchApi";
import {stripeSliceActions} from "../../../store/stripeSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '10px',
    [theme.breakpoints.down(950)]: {
        gridTemplateColumns: '1fr',

    },
    [theme.breakpoints.down(786)]: {
        gridGap: '5px',
    }
}));

const Parent = styled(Stack)(({theme}) => ({
    backgroundColor: '#fff',
    boxShadow: theme.shadows[5],
    borderRadius: '4px',
    padding: '20px',
    height: 'fit-content',
    [theme.breakpoints.down(786)]: {
        borderRadius: '4px 0 0 4px'
    }
}));


//----------------------------------------------------------------
export default function MyProfile() {
    const {customer, clientSecret, customerStatus, getCustomerDataStatus} = useSelector(slice => slice.stripe);
    const {user} = useSelector(slice => slice.user);
    //get client secret from stripe
    useEffect(_ => {
        // debugger
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
                    c: `Error getting client secret. ${e}`
                });
            }
        }
        if(customerStatus.loaded) {
            getClientSecretFromStripe()
                .then()
        }
    }, [customerStatus, clientSecret])

    //get customer id from stripe store in firestore db
    useEffect(_ => {
        if(!customerStatus.loaded)
            window.dispatch(getById({
                id: user.uid,
                collection: 'stripe_customers'
            }))
    }, [customerStatus.loaded]);

    useEffect(_ => {
        if (customerStatus.loaded && !getCustomerDataStatus.loaded) {
            window.dispatch(getCustomerData({endpoint: 'retrieve-customer', customer,token: user.token}))
            window.dispatch(getCustomerData({endpoint: 'retrieve-payment-method', customer,token: user.token}))
        }
    }, [customerStatus.loaded, getCustomerDataStatus.loaded]);

    return (
        <RootStyle>
            <Parent>
                <Typography variant='span' sx={{fontWeight: 600}}>My profile</Typography>
                aaa
            </Parent>
            {/*address*/}
            <Parent>
                <MyAddress/>
            </Parent>
            {/*payment method*/}
            <Parent>
                {(customerStatus.loaded && getCustomerDataStatus.loaded) && <MyPaymentMethod/>}
            </Parent>
        </RootStyle>
    );
}
