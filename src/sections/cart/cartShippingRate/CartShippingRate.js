// material
import {Stack} from "@mui/material";
import Wrapper from "../../../components/Wrapper/Wrapper";
import EzText from "../../../components/ezComponents/EzText/EzText";
import ShippingRate from "./shippingRate/ShippingRate";
import EzSkeleton from "../../../components/EzSkeleton/EzSkeleton";

export default function CartShippingRate(
    {
        user,
        getRatesStatus,
        shippingRate,
        handleShippingRate,
        shippingOptionSelected,
        totalFromCheckedItems
    }) {

    return (
        <Wrapper sx={{gap: '10px', padding: '20px'}}>
            <Stack gap='10px'>
                <EzText text='Shipping Rates'/>
                <EzText text='USPS' sx={{fontWeight: 500}}/>
            </Stack>
            {getRatesStatus.loaded && totalFromCheckedItems > 0 ?
                shippingRate.map(item => {
                    // debugger
                    return <ShippingRate
                        key={item.rateId}
                        shr={item.rateId}
                        name={item.carrierFriendlyName}
                        amount={item.shippingAmount.amount}
                        min={item.carrierDeliveryDays}
                        totalFromCheckedItems={totalFromCheckedItems}
                        handleShippingRate={handleShippingRate}
                        checked={shippingOptionSelected.shr === item.rateId}
                    />
                })
                :
                getRatesStatus.loading ?
                    <EzSkeleton variant='rectangular' height='180px' width='100%'/>
                    :
                    user.dummy ?
                        <EzText text='Sign in first to see shipping options'/>
                        :
                        <EzText text='No item selected'/>
            }
        </Wrapper>
    );
}