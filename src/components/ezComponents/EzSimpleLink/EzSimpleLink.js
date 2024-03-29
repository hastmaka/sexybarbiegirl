// material
import {Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import {NavLink} from "react-router-dom";

//----------------------------------------------------------------

const LinkStyle = styled(Typography)(({theme}) => ({
    textDecoration: 'none',
    fontSize: '12px',
    width: 'fit-content',
    fontWeight: 600,
    borderBottom: '1px solid transparent',
    '&:hover': {
        borderBottom: '1px solid #999',
    }
}));

//----------------------------------------------------------------

export default function EzSimpleLink({text, to, sx}) {
    // debugger
    return (
        <LinkStyle component={NavLink} to={to} sx={{...sx}}>{text}</LinkStyle>
    );
}
