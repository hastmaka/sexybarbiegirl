import {useSelector} from "react-redux";
import {generalSliceActions} from "../../../store/gs-manager-slice";
// material
import {Dialog, Zoom} from "@mui/material";
import {forwardRef} from "react";
import CloseIcon from '@mui/icons-material/Close';
//stripe
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
//
import EzCustomIconButton from "../EzCustomIconButton/EzCustomIconButton";
import Login from '../../../sections/login/Login';
import AddressForm from "../../form/addressForm/AddressForm";
import CardInput from "../../form/cardInput/CardInput";
import CreateAccount from "../../../sections/login/CreateAccount";

//----------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
    return <Zoom direction="down"  ref={ref} {...props} />;
});

//----------------------------------------------------------------
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function EzModalWithTransition() {
    const {modal} = useSelector(slice => slice.generalState);
    const {clientSecret} = useSelector(slice => slice.stripe);
    const options = {
        // passing the client secret obtained in step 3
        clientSecret: clientSecret,
        // Fully customizable with appearance API.
        // appearance: {/*...*/},
    };
    // debugger
    let lChildren;
    switch (modal.who) {
        case 'login':
            lChildren = <Login modal/>
            break;
        case 'create-account':
            lChildren = <CreateAccount modal />
            break;
        case 'address':
            lChildren = <AddressForm type='create'/>
            break;
        case 'card':
            lChildren = <Elements stripe={stripePromise} options={options}>
                <CardInput/>
            </Elements>
            break
        default:
            return

    }

    return (
        <Dialog
            open={modal.open}
            onClose={(e, reason) => {
                // debugger
            }}
            TransitionComponent={Transition}
            maxWidth='lg'
            // keepMounted
            transitionDuration={{enter: 200, exit: 500}}
            aria-describedby="modal_with_transition"
            sx={{
                '& .MuiDialog-paper': {
                    margin: 0,
                    borderRadius: '4px',
                }
            }}
        >
            <EzCustomIconButton
                icon={<CloseIcon/>}
                // toolTipTitle='Close'
                onClick={_ => window.dispatch(generalSliceActions.setModal({open: false, who: ''}))}
                sx={{
                    position: 'absolute',
                    right: 0,
                    margin: '10px',
                    zIndex: 1000
                }}
            />
            {lChildren}
        </Dialog>
    );
}
