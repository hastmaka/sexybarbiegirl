// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../components/ezComponents/EzText/EzText";
import EzSimpleLink from "../../../../components/ezComponents/EzSimpleLink/EzSimpleLink";
import OrderProductContainer from "./OrderProductContainer";
import {useSelector} from "react-redux";

//----------------------------------------------------------------
const parent = {
    flexDirection: 'row',
    borderRadius: '4px',
    border: '1px solid #b6b5b552',
    padding: '10px'
};

const text = {
    color: ''
}
const RootStyle = styled(Stack)(({theme}) => ({
    borderRadius: '4px',
    maxWidth: '1080px',
    width: '90vw',
    height: '680px',
    padding: '30px',
    gap: '20px',
    [theme.breakpoints.down(900)]: {
        width: '80vw',
        padding: '20px',
    },
    [theme.breakpoints.down(700)]: {
        width: '90vw'
    },
}));

const Parent = styled(Stack)(({theme}) => ({
    ...parent,
    [theme.breakpoints.down(900)]: {
        flexDirection: 'column'
    }
}));


//----------------------------------------------------------------

export default function OrderSummaryModal({orderData}) {
    const {amount, create_at, id, item, order_status, shipping, network, last_four} = orderData;
    const {screen} = useSelector(slice => slice.generalState)
    // debugger
    let total = amount / 100,
        // total = (amount / 100).toFixed(2),
        tax = (total * 0.07).toFixed(2),
        granTotal = (total + total * 0.07).toFixed(2);
    return (
        <RootStyle>
            <Stack>
                <EzText
                    text='Order Details'
                    sx={{
                        paddingBottom: '10px',
                        fontSize: '24px'
                    }}
                />
            </Stack>
            {/*top-section*/}
            <Stack>
                <Stack flexDirection='row' justifyContent='space-between' pb={1}>
                    <Stack flexDirection={screen >= 768 ? 'row': 'column'} gap={screen >= 768 ? '20px' : 0}>
                        <EzText text='Ordered on November 15, 2022'/>
                        {screen >= 768 && <EzText text='|'/>}
                        <EzText text='Order Id - UMGTu50o64ggHHT5mreg5rH1znxL'/>
                    </Stack>
                    <Stack>
                        <EzSimpleLink text='View Invoice' to=''/>
                    </Stack>
                </Stack>

                <Parent>
                    <Stack flex={1} p={1} gap='10px'>
                        <EzText text='Shipping Address' sx={{fontSize: '14px'}}/>
                        <Stack>
                            <EzText text={`${shipping.first_name} ${shipping.last_name}`} sx={{...text}}/>
                            <EzText text={`${shipping.address.line1}, ${shipping.address.country}, ${shipping.address.city} `} sx={{...text}}/>
                            <EzText text={`${shipping.address.state}, ${shipping.address.postal_code}`} sx={{...text}}/>
                        </Stack>
                    </Stack>

                    <Stack flex={1} p={1} gap='10px'>
                        <EzText text='Payment Method' sx={{fontSize: '14px'}}/>
                        <Stack flexDirection='row' alignItems='center' sx={{marginTop: '-3px'}}>
                            <EzText
                                text={network}
                                sx={{
                                    border: '1px solid #b0b0b0',
                                    borderRadius: '4px',
                                    padding: '2px 4px',
                                    ...text
                                }}
                            />
                            <EzText text={` **** ${last_four}`} sx={{...text}}/>
                        </Stack>
                    </Stack>

                    <Stack flex={1} p={1} gap='10px'>
                        <EzText text='Order Summary' sx={{fontSize: '14px'}}/>
                        <Stack>
                            <Stack flexDirection='row' justifyContent='space-between'>
                                <EzText text='Item(s) Subtotal' sx={{...text}}/>
                                <EzText text={`$ ${total}`}  sx={{...text}}/>
                            </Stack>
                            <Stack flexDirection='row' justifyContent='space-between'>
                                <EzText text='Shipping and Handling' sx={{...text}}/>
                                <EzText text='$ 0'  sx={{...text}}/>
                            </Stack>
                            <Stack flexDirection='row' justifyContent='space-between'>
                                <EzText text='Total before Tax' sx={{...text}}/>
                                <EzText text={`$ ${total}`}  sx={{...text}}/>{/*plus handling*/}
                            </Stack>
                            <Stack flexDirection='row' justifyContent='space-between'>
                                <EzText text='Tax' sx={{...text}}/>
                                <EzText text={`$ ${tax}`}  sx={{...text}}/>
                            </Stack>
                            <Stack flexDirection='row' justifyContent='space-between'>
                                <EzText text='Gran Total' sx={{...text}}/>
                                <EzText text={`$ ${granTotal}`}  sx={{...text}}/>
                            </Stack>
                        </Stack>
                    </Stack>
                </Parent>
            </Stack>
            {/*bottom-section*/}
            <Stack pb='30px'>
                <Stack pb={1}>
                    <EzText text='Item(s)'/>
                </Stack>

                <Stack
                    sx={{
                        ...parent,
                        display: 'grid'
                    }}>
                    <OrderProductContainer data={item}/>
                </Stack>
            </Stack>
        </RootStyle>
    );
}
