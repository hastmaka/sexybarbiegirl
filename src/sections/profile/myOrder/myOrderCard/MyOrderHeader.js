// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../components/ezComponents/EzText/EzText";
import EzPriceFormat from "../../../../components/ezComponents/EzPriceFormat/EzPriceFormat";
import {useSelector} from "react-redux";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    height: '58px',
    backgroundColor: '#e7e7e7',
    borderRadius: '4px 4px 0 0'
}));

const Child = styled(Stack)(({theme}) => ({
    gap: '5px'
}))

//----------------------------------------------------------------

export default function MyOrderHeader({date, total, shipTo, status, orderId}) {
    const {first_name, last_name, address, city, country, state, zip} = shipTo;
    const {screen} = useSelector(slice => slice.generalState);
    const color = status === "processing" ? '#1fa60b' : '';

    return (
        <RootStyle>
            <Child>
                <EzText text='Order Placed'/>
                <EzText text={date}/>
            </Child>
            <Child>
                <EzText text='Total'/>
                <EzText text={<EzPriceFormat price={total/100}/>}/>
            </Child>
            {screen >= 786 ?
                <>
                    <Child>
                        <EzText text='Ship to'/>
                        <EzText
                            text={`${first_name} ${last_name}, ${address}, ${city}, ${country}, ${state}, ${zip} `}
                            sx={{
                                textDecoration: 'underline',
                                width: '200px',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                            }}
                        />
                    </Child>
                    <Child>
                        <EzText text='Status'/>
                        <EzText text={status} sx={{color: color}}/>
                    </Child>
                    <Child>
                        <EzText text={`Order Id - ${orderId}`}/>
                        <Stack flexDirection='row' justifyContent='space-around'>
                            <EzText text='View Order Details' sx={{color: '#e105c3'}}/>
                            <EzText text='|'/>
                            <EzText text='View invoice' sx={{color: '#e105c3'}}/>
                        </Stack>
                    </Child>
                </>
                :
                <Stack sx={{alignItems: 'flex-end', gap: '5px'}}>
                    <EzText text='View Order Details' sx={{color: '#e105c3'}}/>
                    <EzText text={status} sx={{color: color}}/>
                </Stack>
            }
        </RootStyle>
    );
}
