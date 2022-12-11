// material
import {Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
//
import EzCheckBox from '../../../../../components/ezComponents/EzCheckBox/EzCheckBox';
import CheckBoxContainer from '../../localComponents/checkBoxContainer/CheckBoxContainer';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

const BadgeContainer = styled(Stack)(({theme}) => ({
    border: '1px solid lightgrey',
    borderRadius: '5px',
    color: theme.palette.ecommerce.swatch_2,
    padding: '0 5px',
    margin: '-10px 0 0 10px',
    backgroundColor: theme.palette.ecommerce.pink
}));

//----------------------------------------------------------------

export default function FilterTags() {
    return (
        <RootStyle>
            <CheckBoxContainer>
                <EzCheckBox size='small'/>
                <Typography>Bikini</Typography>
            </CheckBoxContainer>
        </RootStyle>
    );
}
