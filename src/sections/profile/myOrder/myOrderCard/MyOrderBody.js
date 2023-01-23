// material
import {Box, Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzButton from "../../../../components/ezComponents/EzButton/EzButton";
import {btnContained, btnOutlined} from "../../../../helper/Style";
import OrderProduct from "./OrderProduct";
import {useSelector} from "react-redux";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    padding: '10px',
    justifyContent: 'space-between'
}));

const OrderProductContainer = styled(Box)(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    [theme.breakpoints.down(1200)]: {
        gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down(786)]: {
        gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down(520)]: {
        gridTemplateColumns: '1fr',
    }
}))

const MediaQueryBtn = styled(Button)(({theme}) => ({
    [theme.breakpoints.up(1200)]: {
        width: '300px'
    },
    [theme.breakpoints.between(900, 1200)]: {
        width: '200px'
    },
    [theme.breakpoints.down(900)]: {
        width: '150px'
    },
}))
//----------------------------------------------------------------

export default function MyOrderBody({data}) {
    const {screen} = useSelector(slice => slice.generalState);
    return (
        <RootStyle>
            <OrderProductContainer>
                {data.map(item =>
                    <OrderProduct
                        key={item.variation_id}
                        img={item.image}
                        name={item.name}
                        color={item.color}
                        size={item.size}
                        price={item.price}
                    />
                )}
            </OrderProductContainer>
            {screen >= 786 && <Stack gap='10px' justifyContent='flex-end'>
                <MediaQueryBtn sx={{...btnContained}}>Problem With Order</MediaQueryBtn>
                <MediaQueryBtn sx={{...btnOutlined}}>Feedback</MediaQueryBtn>
            </Stack>}
        </RootStyle>
    );
}
