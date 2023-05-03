import {useSelector} from "react-redux";
import {useEffect} from "react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {getDataAndKeepSync} from "../../../helper/firebase/FirestoreApi";
//
import MyOrderCard from "./myOrderCard/MyOrderCard";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '10px',
    gap: '10px',
    [theme.breakpoints.down(786)]: {
        borderRadius: '4px 0 0 4px'
    }
}));
//---------------------------------------------------------------


export default function MyOrder() {
    const {user, order, orderStatus, userStatus} = useSelector(slice => slice.user);
    // debugger

    useEffect(_ => {
        getDataAndKeepSync({id: user.uid, collection: 'orders'}).then()
    }, [user])

    return (
        <RootStyle>
            {/*suspense*/}
            {orderStatus.loaded &&
                order.map(item =>
                    <MyOrderCard
                        key={item.id}
                        orderData={item}
                    />
                )
            }
        </RootStyle>
    );
}