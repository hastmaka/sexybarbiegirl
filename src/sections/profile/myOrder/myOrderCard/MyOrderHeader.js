// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../components/ezComponents/EzText/EzText";
import EzPriceFormat from "../../../../components/ezComponents/EzPriceFormat/EzPriceFormat";
import {useSelector} from "react-redux";
import EzSimpleLink from "../../../../components/ezComponents/EzSimpleLink/EzSimpleLink";

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
}));

const linkStyle = {
    borderBottom: '1px solid transparent',
    width: 'fit-content',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:hover' : {
        borderBottom: '1px solid #999',
    }
}

//----------------------------------------------------------------

export default function MyOrderHeader({date, total, shipTo, status, orderId, setOpen}) {
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
                            text={`
                                ${shipTo.first_name} 
                                ${shipTo.last_name}, 
                                ${shipTo.address_line_1}, 
                                ${shipTo.country_code}, 
                                ${shipTo.city_locality},
                                ${shipTo.state_province}, 
                                ${shipTo.postal_code}
                            `}
                            sx={{...linkStyle, width: '200px'}}
                        />
                    </Child>
                    <Child>
                        <EzText text='Status'/>
                        <EzText text={status} sx={{color: color}}/>
                    </Child>
                    <Child>
                        <EzText text={`Order Id - ${orderId}`}/>
                        <Stack flexDirection='row' justifyContent='space-around'>
                            <EzText
                                onClick={_ => setOpen(true)}
                                text='View Order Details'
                                sx={{
                                    ...linkStyle,
                                    color: '#e105c3'
                                }}
                            />
                            <EzText text='|'/>
                            <EzText text='View Invoice' sx={{...linkStyle, color: '#e105c3'}}/>
                        </Stack>
                    </Child>
                </>
                :
                <Stack sx={{alignItems: 'flex-end', gap: '5px'}}>
                    <EzText
                        onClick={_ => setOpen(true)}
                        text='View Order Details'
                        sx={{
                            ...linkStyle,
                            color: '#e105c3'
                        }}
                    />
                    <EzText text={status} sx={{color: color}}/>
                </Stack>
            }
        </RootStyle>
    );
}
