// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import MyAddress from "./myAddress/MyAddress";
import MyPaymentMethod from "./myPaymentMethod/MyPaymentMethod";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '10px',
    [theme.breakpoints.down(950)]: {
        gridTemplateColumns: '1fr',

    },
    [theme.breakpoints.down(786)]: {
        gridGap: '5px',
    }
}));

const Parent = styled(Stack)(({theme}) => ({
    backgroundColor: '#fff',
    boxShadow: theme.shadows[5],
    borderRadius: '4px',
    padding: '20px',
    height: 'fit-content',
    [theme.breakpoints.down(786)]: {
        borderRadius: '4px 0 0 4px'
    }
}));


//----------------------------------------------------------------
export default function MyProfile() {

    return (
        <RootStyle>
            <Parent>
                <Typography variant='span' sx={{fontWeight: 600}}>My profile</Typography>
                aaa
            </Parent>
            {/*address*/}
            <Parent>
                <MyAddress/>
            </Parent>
            {/*payment method*/}
            <Parent>
                <MyPaymentMethod/>
            </Parent>
        </RootStyle>
    );
}
