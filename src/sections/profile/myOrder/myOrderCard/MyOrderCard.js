// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import MyOrderHeader from "./MyOrderHeader";
import MyOrderBody from "./MyOrderBody";
import OrderSummaryModal from "./OrderSummaryModal";
import EzModal from "../../../../components/ezComponents/EzModal/EzModal";
import {useState} from "react";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    border: `1px solid ${'#dedede'}`,
    borderRadius: '4px'
}));

//----------------------------------------------------------------

export default function MyOrderCard({orderData}) {
    const {amount, create_at, id, item, order_status, shipping} = orderData;
    const fixDate = new Date(create_at).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"});

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // debugger
    return (
        <RootStyle>
            {open && <EzModal open={open} handleClose={_ => handleClose()}>
                <OrderSummaryModal orderData={orderData}/>
            </EzModal>}
            <MyOrderHeader
                date={fixDate}
                total={amount}
                shipTo={shipping}
                status={order_status}
                orderId={id}
                setOpen={handleOpen}
            />
            <MyOrderBody data={item}/>
        </RootStyle>
    );
}
