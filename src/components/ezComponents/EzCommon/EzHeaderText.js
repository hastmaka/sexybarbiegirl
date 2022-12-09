// material
import {Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Typography)(({theme}) => ({
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize',
    color: theme.palette.ecommerce.inactive_color
}));

//----------------------------------------------------------------

export default function EzHeaderText({children, other}) {
    return (
        <RootStyle {...other}>
            {children}
        </RootStyle>
    );
}
