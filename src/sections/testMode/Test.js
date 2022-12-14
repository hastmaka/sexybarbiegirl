// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import a from '../../resources/nav_nachos@2x.png'

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: '100vh',
    width: '20%',
    backgroundAttachment: 'fixed',
    backgroundColor: '#d52525',
    backgroundImage: `url(${a})`,
    backgroundSize: '20% 600px',
    backgroundPosition: 'left 0 bottom 0',
    backgroundRepeat: 'no-repeat'
}));

//----------------------------------------------------------------

export default function Test() {
    return (
        <RootStyle>
        </RootStyle>
    );
}
