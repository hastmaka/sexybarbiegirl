// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {btnContained, btnOutlined} from "../../../../helper/Style";
import {useSelector} from "react-redux";
import OrderProductContainer from "./OrderProductContainer";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    padding: '10px',
    justifyContent: 'space-between'
}));

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
            <Stack sx={{flex: 1}}>
                <OrderProductContainer data={data}/>
            </Stack>
            {screen >= 786 && <Stack gap='10px' justifyContent='flex-end'>
                <MediaQueryBtn sx={{...btnContained}}>Problem With Order</MediaQueryBtn>
                <MediaQueryBtn sx={{...btnOutlined}}>Feedback</MediaQueryBtn>
            </Stack>}
        </RootStyle>
    );
}
