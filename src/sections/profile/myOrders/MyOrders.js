import {useSelector} from "react-redux";
import {useEffect} from "react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import Table from "./table/table";
import {getRTDataFromUserOrder} from "../../../helper/FirestoreApi";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '20px',
    [theme.breakpoints.down(786)]: {
        borderRadius: '4px 0 0 4px'
    }
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
    const {user, order, orderStatus, userStatus} = useSelector(slice => slice.user);
    // debugger

    useEffect(_ => {
        getRTDataFromUserOrder({userId: user.uid, collection: 'orders'}).then()
    }, [])

    return (
        <RootStyle>
            {orderStatus.loaded &&
                <Table
                    td={['Product', 'Total', 'Tracking #', 'Status']}
                    tr={order}
                />
            }
        </RootStyle>
    );
}