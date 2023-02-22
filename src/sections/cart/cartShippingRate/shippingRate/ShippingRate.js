import {useSelector} from "react-redux";
//material
import {styled} from '@mui/material/styles';
import {Stack} from "@mui/material";
//
import EzCheckBox from "../../../../components/ezComponents/EzCheckBox/EzCheckBox";
import EzPriceFormat from "../../../../components/ezComponents/EzPriceFormat/EzPriceFormat";
import EzCard from "../../../../components/ezComponents/EzCard/EzCard";
import EzText from "../../../../components/ezComponents/EzText/EzText";
//----------------------------------------------------------------

const CardElementContent = styled(EzCard)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px 5px 5px',
}))

//----------------------------------------------------------------

export default function ShippingRate({checked, handleShippingRate, shr, amount, min, totalFromCheckedItems}) {
    const {user} = useSelector(slice => slice.user);
    // debugger
    return (
        <CardElementContent>
            <Stack flexDirection='row' gap='5px' alignItems='center'>
                <EzCheckBox onChange={_ => handleShippingRate(shr, amount)} checked={user.cart.item.length && checked} disabled={!user.cart.item.length}/>
                <EzText text={`(${min} - business-days)`}/>
            </Stack>
            <EzText
                text={totalFromCheckedItems > 100 ? 'Free' : <EzPriceFormat price={amount} color='#3a3a3a' priceFS={16}/>}
                sx={{paddingRight: amount === 0 ? '5px' : ''}}
            />
        </CardElementContent>
    );
}