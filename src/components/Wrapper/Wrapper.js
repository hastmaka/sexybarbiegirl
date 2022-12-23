// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    backgroundColor: theme.palette.grey[0],
    boxShadow: theme.shadows[5],
    borderRadius: '4px',
    padding: '10px'
}));

//----------------------------------------------------------------

export default function Wrapper({children, sx}) {
    return (
        <RootStyle sx={{...sx}}>
            {children}
        </RootStyle>
    );
}
