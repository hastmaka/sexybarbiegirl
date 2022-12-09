import {useSelector} from "react-redux";
//material
import {styled} from '@mui/material/styles';
import {Stack} from "@mui/material";
//
import EzCheckBox from "../../../../components/ezComponents/EzCheckBox/EzCheckBox";
import EzFormatPrice from "../../../../components/ezComponents/EzFormatPrice/EzFormatPrice";
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

export default function ShippingRate({checked, handleShippingRate, shr, amount, min, max, name}) {
    const {user} = useSelector(slice => slice.user);
    // debugger
    return (
        <CardElementContent>
            <Stack flexDirection='row' gap='5px' alignItems='center'>
                <EzCheckBox onChange={_ => handleShippingRate(shr, amount)} checked={checked} disabled={!user.cart.item.length}/>
                <EzText text={`${name}(${min.value} - ${max.value} business-days)`}/>
            </Stack>
            <EzText
                text={amount === 0 ? 'Free' : <EzFormatPrice price={amount / 100} color='#3a3a3a' priceFS={16}/>}
                sx={{paddingRight: amount === 0 ? '5px' : ''}}
            />
        </CardElementContent>
    );
}