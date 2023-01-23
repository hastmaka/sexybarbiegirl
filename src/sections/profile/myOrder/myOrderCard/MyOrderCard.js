// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import MyOrderHeader from "./MyOrderHeader";
import MyOrderBody from "./MyOrderBody";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    border: `1px solid ${'#dedede'}`,
    borderRadius: '4px',
}));

//----------------------------------------------------------------

export default function MyOrderCard({orderData}) {
    const {amount, create_at, id, item, order_status, shipping} = orderData;
    const fixDate = new Date(create_at).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})
    // debugger
    return (
        <RootStyle>
            <MyOrderHeader
                date={fixDate}
                total={amount}
                shipTo={shipping}
                status={order_status}
                orderId={id}
            />
            <MyOrderBody data={item}/>
        </RootStyle>
    );
}
