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
import {openModal} from "../../../helper/Helper";
import Login from "../../login/Login";
import {Elements} from "@stripe/react-stripe-js";
import CardInput from "../../../components/form/cardInput/CardInput";
import {loadStripe} from "@stripe/stripe-js";

//----------------------------------------------------------------
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
export default function CartPayment({
                                        user,
                                        customer,
                                        clientSecret,
                                        customerStatus,
                                        mainPaymentMethod,
                                        getCustomerDataStatus
}) {
    const options = {
        // passing the client secret obtained in step 3
        clientSecret: clientSecret,
        // Fully customizable with appearance API.
        // appearance: {/*...*/},
    };

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
                            window.confirm({t: 'info', c: `Sign in to manage your 'Payment Method'`})
                                .then(res => {
                                    if (res) {
                                        openModal(<Login modal/>)
                                    }
                                })
                        } else {
                            openModal(<Elements stripe={stripePromise} options={options}>
                                <CardInput/>
                            </Elements>)
                        }
                    }}
                />
            </Stack>
            {user.dummy ?
                <EzText text='Sign in first to see your Payment Method'/>
                :
                customerStatus.loaded && getCustomerDataStatus.loaded ?
                !!mainPaymentMethod ?
                        <>
                            <CreditCardSelection
                                card={mainPaymentMethod[0].card}
                                pm={mainPaymentMethod[0].id}
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