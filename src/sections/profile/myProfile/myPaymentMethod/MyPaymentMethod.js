// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzCustomIconButton from "../../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditCardSelection from "../../../cart/cartPayment/creditCardSelection/CreditCardSelection";
import {useSelector} from "react-redux";
import {stripeSliceActions} from "../../../../store/stripeSlice";
import EzText from "../../../../components/ezComponents/EzText/EzText";
import {generalSliceActions} from "../../../../store/gs-manager-slice";

//----------------------------------------------------------------

const Child = styled(Stack)(() => ({
    padding: '20px 0',
    gap: '10px'
}));

//----------------------------------------------------------------

export default function MyPaymentMethod({onClick}) {
    const {customer, paymentMethod} = useSelector(slice => slice.stripe);
    const handleCardSelection = (pm) => {
        window.dispatch(stripeSliceActions.setPaymentMethod(pm))
        window.displayNotification({type: 'info', content: 'Payment method changed successfully'})
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
            {!customer.paymentMethod.data.length ?
                <EzText text='Need to add some Payment Method' sx={{marginTop: '20px'}}/> :
                <Child>
                    {customer.paymentMethod.data.map(item =>
                        <CreditCardSelection
                            key={item.id}
                            card={item.card}
                            pm={item.id}
                            checked={paymentMethod === item.id}
                            handleCardSelection={customer.paymentMethod.data.length > 1 ? handleCardSelection : false}
                        />
                    )}
                </Child>
            }

        </>
    );
}
