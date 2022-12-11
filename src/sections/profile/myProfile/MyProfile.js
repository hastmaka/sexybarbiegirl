// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import MyAddress from "./myAddress/MyAddress";
import MyPaymentMethod from "./myPaymentMethod/MyPaymentMethod";
import {useSelector} from "react-redux";
import {fetchAPI} from "../../../helper/FetchApi";
import {getCustomerData, urlFirebase, urlLocal} from "../../../helper/stripe/StripeApi";
import {stripeSliceActions} from "../../../store/stripeSlice";
import {useEffect} from "react";
import {getAll} from "../../../helper/FirestoreApi";

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
    const {clientSecret, customer, customerStatus, getCustomerDataStatus} = useSelector(slice => slice.stripe);
    const {user} = useSelector(slice => slice.user);
    // debugger
    //get client secret from stripe
    useEffect(_ => {
        // debugger
        if(clientSecret) {
            return
        }
        const getClientSecretFromStripe = async () => {
            try {
                const res = await fetchAPI(
                    urlFirebase,
                    'create-payment-intent-to-save-a-card',
                    'POST',
                    {customer_id: customer.customer_id}
                )
                window.dispatch(stripeSliceActions.setSecret(res.client_secret))
            } catch (e) {
                window.displayNotification({
                    t: 'error',
                    c: `Some Error. ${e}`
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
        window.dispatch(getAll({
            collection: 'stripe_customers',
            filters: [{
                field: 'email',
                operator: '==',
                value: user.email
            }]
        }))
    }, []);

    useEffect(_ => {
        if (customerStatus.loaded) {
            window.dispatch(getCustomerData({endpoint: 'retrieve-customer', customer}))
            window.dispatch(getCustomerData({endpoint: 'retrieve-payment-method', customer}))
        }
    }, [customerStatus.loaded]);

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
