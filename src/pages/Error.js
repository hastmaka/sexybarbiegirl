// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: 'calc(100vh - 110px)'
}));

//----------------------------------------------------------------

export default function Error() {
    return (
        <RootStyle>
            Error test
        </RootStyle>
    );
}
