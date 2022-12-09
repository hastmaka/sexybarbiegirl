// material
import {Stack} from "@mui/material";
import AddCardIcon from '@mui/icons-material/AddCard';
//
import Wrapper from "../../../components/Wrapper/Wrapper";
import EzText from "../../../components/ezComponents/EzText/EzText";
import EzCustomIconButton from "../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
import EzHelpText from "../../../components/ezComponents/EzHelpText/EzHelpText";
import CreditCardSelection from "./creditCardSelection/CreditCardSelection";
import EzSkeleton from "../../../components/EzSkeleton/EzSkeleton";
import {generalSliceActions} from "../../../store/gs-manager-slice";

//----------------------------------------------------------------

export default function CartPayment({
                                        user,
                                        customer,
                                        customerStatus,
                                        selectedPaymentMethod,
                                        getCustomerDataStatus,
                                        paymentMethod
}) {
    // debugger
    return (
        <Wrapper sx={{gap: '20px',padding: '20px'}}>
            <Stack flexDirection='row' justifyContent='space-between'>
                <EzText text='Payment Method'/>
                <EzCustomIconButton
                    sx={{padding: 0}}
                    icon={<AddCardIcon/>}
                    toolTipTitle='Add Address'
                    onClick={_ => {
                        if(user.dummy) {
                            window.confirm({type: 'info', content: `Sign in to manage your 'Payment Method'`})
                                .then(res => {
                                    if (res) {
                                        window.dispatch(generalSliceActions.setModal({open: true, who: 'login'}))
                                    }
                                })
                        } else {
                            window.dispatch(generalSliceActions.setModal({open: true, who: 'card'}))
                        }
                    }}
                />
            </Stack>
            {user.dummy ?
                <EzText text='Sign in first to see your Payment Method'/>
                :
                customerStatus.loaded && getCustomerDataStatus.loaded ?
                customer?.paymentMethod?.data.length ?
                        <>
                            <CreditCardSelection
                                card={selectedPaymentMethod[0].card}
                                pm={selectedPaymentMethod[0].id}
                                // checked={paymentMethod === selectedPaymentMethod[0].id}
                                handleCardSelection={false}
                            />
                            <EzHelpText
                                text='to manage addresses go profile/My Profile/Address Book'
                                alignment='center'
                            />
                        </>
                    :
                <EzText text='Need to add some address first'/>
                    :
                    <EzSkeleton variant='rectangular' height='58px' width='100%'/>
            }
        </Wrapper>
    );
}