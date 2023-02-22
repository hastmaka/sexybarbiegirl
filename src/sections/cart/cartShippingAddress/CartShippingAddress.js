// material
import {Stack} from "@mui/material";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
//
import EzText from "../../../components/ezComponents/EzText/EzText";
import Wrapper from "../../../components/Wrapper/Wrapper";
import EzCustomIconButton from "../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
import AddressCard from "./addressCard/AddressCard";
import EzHelpText from "../../../components/ezComponents/EzHelpText/EzHelpText";
import {openModal} from "../../../helper/Helper";
import Login from "../../login/Login";
import AddressForm from "../../../components/form/addressForm/AddressForm";
import {initialAddressFormData} from "../../../helper/ShipEngine";

//----------------------------------------------------------------

export default function CartShippingAddress({user}) {
    return (
        <Wrapper sx={{gap: '20px',padding: '20px'}}>
            <Stack flexDirection='row' justifyContent='space-between'>
                <EzText text='Shipping Address'/>
                <EzCustomIconButton
                    sx={{padding: 0}}
                    icon={<AddLocationAltIcon/>}
                    toolTipTitle='Add Address'
                    onClick={_ => {
                        if(user.dummy) {
                            window.confirm({t: 'info', c: `Sign in to manage your 'Address'`})
                                .then(res => {
                                    if (res) {
                                        openModal(<Login modal/>)
                                    }
                                })
                        } else {
                            openModal(<AddressForm type='create' tempData={initialAddressFormData}/>)
                        }
                    }}
                />
            </Stack>
            {user.dummy ?
                <EzText text='Sign in first to see your address'/>
                :
                user.address.length ?
                    <>
                        <AddressCard
                            action={false}
                            data={user.address.filter(item => item.main)[0]}
                        />
                        <EzHelpText
                            text='to manage addresses go profile/My Profile/Address Book'
                            alignment='center'
                        />
                    </>
                    :
                    <EzText text='Need to add some address first'/>
            }
        </Wrapper>
    );
}