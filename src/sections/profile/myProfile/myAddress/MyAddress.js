import {useSelector} from "react-redux";
// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
//
import {userSliceActions} from "../../../../store/userSlice";
import EzCustomIconButton from "../../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
import AddressCard from "../../../cart/cartShippingAddress/addressCard/AddressCard";
import EzText from "../../../../components/ezComponents/EzText/EzText";
import {openModal} from "../../../../helper/Helper";
import AddressForm from "../../../../components/form/addressForm/AddressForm";
import {initialAddressFormData} from "../../../../helper/ShipEngine";

//----------------------------------------------------------------

const Child = styled(Stack)(() => ({
    padding: '20px 0',
    gap: '10px'
}));

//----------------------------------------------------------------
export default function MyAddress() {
    const {user} = useSelector(slice => slice.user);
    const addressSorted = [...user.address].sort((x, y) => {return (y.main - x.main) * 2 - 1});

    return (
        <>
            <Stack flexDirection='row' justifyContent='space-between'>
                <Typography variant='span' sx={{fontWeight: 600}}>Address Book</Typography>
                <EzCustomIconButton
                    sx={{padding: 0}}
                    icon={<AddLocationAltIcon/>}
                    toolTipTitle='Add Address'
                    onClick={_ => openModal(<AddressForm type='create' tempData={initialAddressFormData}/>)}
                />
            </Stack>
            {!user.address.length ?
                <EzText text='Need to add some address' sx={{marginTop: '20px'}}/> :
                <Child>
                    {addressSorted.map(item =>
                        <AddressCard
                            key={item.id}
                            data={item}
                            onClick={(main, id) => window.dispatch(userSliceActions.setMainAddress({main, id}))}
                        />
                    )}
                </Child>
            }
        </>
    );
}
