import {useSelector} from "react-redux";
// material
import {Stack, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import EzText from "../../../components/ezComponents/EzText/EzText";
import {timer} from '../../../helper/Helper'

//-------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: '82px',
    width: '61px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    alignItems: 'center',
    fontWeight: 700,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.down(786)]: {
        height: '62px',
        width: '46px'
    }
}));

const Timer = styled(EzText)(({theme}) => ({
    color: theme.palette.ecommerce.inactive_color,
    fontSize: '24px',
    [theme.breakpoints.down(786)]: {
        fontSize: '16px'
    }
}));

const CounterText = styled(EzText)(({theme}) => ({
    color: theme.palette.ecommerce.pink,
    padding: '8px 0 12px 0'
}))
//-------------------------------------------------------

export default function HotPromotionCounter({text}) {
    let a = timer();
    // debugger
    return (
        <RootStyle>
            <CounterText text={text}/>
            {/*<Timer text={timer}/>*/}
        </RootStyle>
    )
}
