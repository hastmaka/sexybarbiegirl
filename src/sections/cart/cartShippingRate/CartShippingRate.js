// material
import {Stack} from "@mui/material";
import Wrapper from "../../../components/Wrapper/Wrapper";
import EzText from "../../../components/ezComponents/EzText/EzText";
import ShippingRate from "./shippingRate/ShippingRate";
import EzSkeleton from "../../../components/EzSkeleton/EzSkeleton";

export default function CartShippingRate({
                                             getAllShippingOptionStatus,
                                             shippingRate,
                                             handleShippingRate,
                                             shippingOptionSelected}) {
    return (
        <Wrapper sx={{gap: '10px', padding: '20px'}}>
            <Stack gap='10px'>
                <EzText text='Shipping Rates'/>
                <EzText text='Ground-FedEx' sx={{fontWeight: 500}}/>
            </Stack>
            {getAllShippingOptionStatus.loaded ?
                shippingRate.data.map(item =>
                    <ShippingRate
                        key={item.id}
                        shr={item.id}
                        name={item.display_name}
                        amount={item.fixed_amount.amount}
                        min={item.delivery_estimate.minimum}
                        max={item.delivery_estimate.maximum}
                        handleShippingRate={handleShippingRate}
                        checked={shippingOptionSelected.shr === item.id}
                    />
                )
                :
                getAllShippingOptionStatus.loading ?
                <EzSkeleton variant='rectangular' height='180px' width='100%'/>
                    :
                    <EzText text='Sign in first to see shipping options'/>
            }
        </Wrapper>
    );
}