import {useSelector} from "react-redux";
import {useEffect} from "react";
// material
import {Button, Divider, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import {getAll, getById} from "../../../helper/FirestoreApi";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Table from "./table/table";
import EzButton from "../../../components/ezComponents/EzButton/EzButton";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    padding: '20px'
}));

const TableContainer = styled(Stack)(() => ({
    width: '100%',
}));

const sx = {
    color: '#f438de',
        backgroundColor: 'transparent',
        border: `1px solid ${'#f438de'}`,
        '&:hover': {
        color: '#fff',
            backgroundColor: '#f438de',
    }
}

//----------------------------------------------------------------

export default function MyOrders() {
    const {user, orderStatus} = useSelector(slice => slice.user);
    // debugger

    return (
        <RootStyle>
            {orderStatus.loaded &&
                <Stack gap='15px'>
                    <Stack flexDirection='row' alignItems='center' gap='5px'>
                        <FiberManualRecordIcon sx={{fontSize: '10px'}}/>
                        <Typography variant='span'>Processing</Typography>
                    </Stack>
                    <Stack flexDirection='row' alignItems='center' gap='15px'>

                        <Stack flex='2' border='1px solid lightgrey' py='20px'>
                            <Stack>

                            </Stack>

                            <Divider/>

                            <Stack>

                            </Stack>
                        </Stack>


                        <Stack flex='1' border='1px solid lightgrey' gap='15px' p='20px'>
                            <EzButton>Track Order</EzButton>
                            <EzButton sx={{...sx}}>View order details</EzButton>
                            <EzButton sx={{...sx}}>Get invoice</EzButton>
                        </Stack>

                    </Stack>
                </Stack>
            }
        </RootStyle>
    );
}


// <TableContainer screen={window.screen}>
//     <Table
//         td={['Item', 'Amount', 'Date', 'Order Status']}
//         tr={user.order}
//     />
// </TableContainer> :
// <Stack>No Order has made yet</Stack>