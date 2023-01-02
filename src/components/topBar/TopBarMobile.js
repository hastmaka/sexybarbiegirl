import {useSelector} from "react-redux";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import Logo from '../../resources/Asset 56@2x.png';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({scrolltop, theme}) => ({
    height: '70px',
    justifyContent: 'center',
    boxShadow: scrolltop === 0 ? '' : '0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);',
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 1000,
    [theme.breakpoints.down(786)]: {
        height: '75px'
    }
}));

//----------------------------------------------------------------

export default function TopBarMobile() {
    const {scrollTop, screen} = useSelector(slice => slice.generalState);
    return (
        <RootStyle scrolltop={scrollTop}>
            <Stack sx={{position: 'absolute', left: '10px'}}>
                <Stack sx={{width: {lg: '180px', xs: '130px'}, height: {lg: '60px', xs: '40px'}, justifyContent: 'center'}}>
                    <img src={Logo} alt='logo' style={{filter: 'saturate(2.5)', width: '100%', height: '100%'}}/>
                </Stack>
            </Stack>
        </RootStyle>
    );
}
