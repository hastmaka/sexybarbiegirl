// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    borderRadius: '4px',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(212 212 212 / 62%)',
    boxShadow: '0 0px 1px rgba(0, 0, 0, 0.1)',
    transition: 'all 200ms',
    '&:hover': {
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
}));

//----------------------------------------------------------------

export default function EzCard({children, ...rest}) {
    return (
        <RootStyle {...rest}>
            {children}
        </RootStyle>
    );
}
