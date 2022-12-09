// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    border: '1px solid black',
    height: '726px'
}));

//----------------------------------------------------------------

export default function TopTrendingAdded() {
    return (
        <RootStyle>
            TopTrendingAdded
        </RootStyle>
    );
}
