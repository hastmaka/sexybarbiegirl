import {useSelector} from "react-redux";
// material
import {Stack, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

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

const TimerTypography = styled(Typography)(({theme}) => ({
    color: theme.palette.ecommerce.inactive_color,
    fontSize: '24px',
    [theme.breakpoints.down(786)]: {
        fontSize: '16px'
    }
}));

//-------------------------------------------------------

export default function HotPromotionCounter({text, timer}) {
    return (
        <RootStyle>
            <Typography
                variant='span'
                sx={({palette}) => ({
                    color: palette.ecommerce.pink,
                    padding: '8px 0 12px 0'
                })}
            >
                {text}
            </Typography>
            <TimerTypography variant='span'>
                {timer}
            </TimerTypography>
        </RootStyle>
    )
}
