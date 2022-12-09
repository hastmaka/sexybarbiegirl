// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzCustomIconButton from "../../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AddressCard from "../../../cart/cartShippingAddress/addressCard/AddressCard";
import {userSliceActions} from "../../../../store/userSlice";
import {useSelector} from "react-redux";
import {generalSliceActions} from "../../../../store/gs-manager-slice";
import EzText from "../../../../components/ezComponents/EzText/EzText";

//----------------------------------------------------------------

const Child = styled(Stack)(() => ({
    padding: '20px 0',
    gap: '10px'
}));

//----------------------------------------------------------------

export default function MyAddress({onClick}) {
    const {user} = useSelector(slice => slice.user);
    const addressSorted = [...user.address].sort((x, y) => {
        return (y.main - x.main) * 2 - 1
    });
    return (
        <>
            <Stack flexDirection='row' justifyContent='space-between'>
                <Typography variant='span' sx={{fontWeight: 600}}>Address Book</Typography>
                <EzCustomIconButton
                    sx={{padding: 0}}
                    icon={<AddLocationAltIcon/>}
                    toolTipTitle='Add Address'
                    onClick={_ => window.dispatch(generalSliceActions.setModal({open: true, who: 'address'}))}
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
