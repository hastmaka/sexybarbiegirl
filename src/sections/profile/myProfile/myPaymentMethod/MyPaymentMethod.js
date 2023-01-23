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
import {generalSliceActions} from "../../../../store/gs-manager-slice";
import {update} from "../../../../helper/FirestoreApi";
import EzCircularLoader from "../../../../components/ezComponents/EzCircularLoader/EzCircularLoader";
import {sortPaymentMethod} from "../../../../helper/Helper";
import CreditCardSkeleton from "../../../../components/Skeleton/CreditCardSkeleton";

//----------------------------------------------------------------

const Child = styled(Stack)(() => ({
    padding: '20px 0',
    gap: '10px'
}));

//----------------------------------------------------------------
const CreditCardSelection = lazy(() => import('../../../cart/cartPayment/creditCardSelection/CreditCardSelection'))

export default function MyPaymentMethod() {
    const {customer, updatePaymentMethodStatus, getCustomerDataStatus, customerStatus} = useSelector(slice => slice.stripe);
    const {user} = useSelector(slice => slice.user);
    const paymentMethodSorted = (customer?.payment_method?.length && customer?.paymentMethod?.data?.length) &&
        sortPaymentMethod(customer?.paymentMethod?.data, customer?.payment_method);

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
    return (
        <>
            <Stack flexDirection='row' justifyContent='space-between'>
                <EzText text='Payment Method'/>
                <EzCustomIconButton
                    sx={{padding: 0}}
                    icon={<AddCardIcon/>}
                    toolTipTitle='Add Card'
                    onClick={_ => window.dispatch(generalSliceActions.setModal({open: true, who: 'card'}))}
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