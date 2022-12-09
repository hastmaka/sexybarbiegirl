// material
import {Stack} from '@mui/material';
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)({
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
});

//----------------------------------------------------------------

export default function CheckBoxContainer(props) {
    return (
        <RootStyle {...props.sx}>
            {props.children}
        </RootStyle>
    );
}
