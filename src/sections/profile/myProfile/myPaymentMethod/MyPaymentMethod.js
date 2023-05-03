import {lazy, Suspense} from "react";
import {useSelector} from "react-redux";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddCardIcon from "@mui/icons-material/AddCard";
//
import EzCustomIconButton from "../../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
// import CreditCardSelection from "../../../cart/cartPayment/creditCardSelection/CreditCardSelection";
import EzText from "../../../../components/ezComponents/EzText/EzText";
import {update} from "../../../../helper/firebase/FirestoreApi";
import EzCircularLoader from "../../../../components/ezComponents/EzCircularLoader/EzCircularLoader";
import {openModal, sortPaymentMethod} from "../../../../helper/common";
import CreditCardSkeleton from "../../../../components/Skeleton/CreditCardSkeleton";
import CardInput from "../../../../components/form/cardInput/CardInput";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

//----------------------------------------------------------------

const Child = styled(Stack)(() => ({
    padding: '20px 0',
    gap: '10px'
}));

//----------------------------------------------------------------
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const CreditCardSelection = lazy(() => import('../../../cart/cartPayment/creditCardSelection/CreditCardSelection'))

export default function MyPaymentMethod() {
    const {clientSecret, customer, updatePaymentMethodStatus, getCustomerDataStatus, customerStatus} = useSelector(slice => slice.stripe);
    const {user} = useSelector(slice => slice.user);
    const paymentMethodSorted = (customer?.payment_method?.length && customer?.paymentMethod?.data?.length) &&
        sortPaymentMethod(customer?.paymentMethod?.data, customer?.payment_method);
    const options = {
        // passing the client secret obtained in step 3
        clientSecret: clientSecret,
        // Fully customizable with appearance API.
        // appearance: {/*...*/},
    };

    const handleCardSelection = (pm) => {
        let payment_methodUpdated = customer.payment_method.map(item => {
            return item.main ? {...item, main: !item.main} :
                item.pm === pm ? {...item, main: !item.main} : item
        })
        window.dispatch(update({
            id: user.uid,
            collection: 'stripe_customers',
            data: payment_methodUpdated
        }))
        window.displayNotification({
            t: 'info',
            c: 'Payment method changed successfully'
        })
    }

    const Data = () => {
        return (
            !customer?.paymentMethod?.data?.length ?
                <EzText text='Need to add some Payment Method' sx={{marginTop: '20px'}}/> :
                <Child>
                    {paymentMethodSorted.map(item =>
                        <CreditCardSelection
                            key={item.id}
                            card={item.card}
                            pm={item.id}
                            checked={(customer.payment_method.findIndex(i => i.pm === item.id && i.main)) >= 0}
                            handleCardSelection={customer.paymentMethod.data.length > 1 ? handleCardSelection : false}
                        />
                    )}
                </Child>
        )
    }

    return (
        <>
            <Stack flexDirection='row' justifyContent='space-between'>
                <EzText text='Payment Method'/>
                <EzCustomIconButton
                    sx={{padding: 0}}
                    icon={<AddCardIcon/>}
                    toolTipTitle='Add Card'
                    onClick={_ => openModal(<Elements stripe={stripePromise} options={options}>
                        <CardInput/>
                    </Elements>)}
                />
            </Stack>
            {(getCustomerDataStatus.loaded && customerStatus.loaded) &&
                <Suspense fallback={<CreditCardSkeleton/>}>
                    {updatePaymentMethodStatus?.loading ? <EzCircularLoader/> : <Data/>}
                </Suspense>
            }
        </>
    );
}


function wait(time) {
    return new Promise(res => {
        setTimeout(res, time)
    })
}