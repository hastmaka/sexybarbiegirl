// material
import {Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
//
import EzCheckBox from '../../../../../components/ezComponents/EzCheckBox/EzCheckBox';
import {useSelector} from 'react-redux';
import {generalSliceActions} from '../../../../../store/gs-manager-slice';
import {shopSliceActions} from "../../../../../store/shopSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: ''
}));

const CheckBoxContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center'
}));

//----------------------------------------------------------------

export default function FilterAvailability() {
    const {filter} = useSelector(slice => slice.shop);

    const onCheckHandler = (newValue) => {
        if (newValue === filter?.availability) {
            return window.dispatch(shopSliceActions.removeFilter('availability'));
        }
        return window.dispatch(shopSliceActions.setFilter({availability: newValue, property: 'availability'}));
    }

    return (
        filter && <RootStyle>
            <CheckBoxContainer>
                <EzCheckBox
                    size='small'
                    checked={filter.availability === 'instock'}
                    onChange={_ => onCheckHandler('instock')}
                />
                <Typography>In Stock</Typography>
            </CheckBoxContainer>
            <CheckBoxContainer>
                <EzCheckBox
                    size='small'
                    checked={filter.availability === 'outofstock'}
                    onChange={_ => onCheckHandler('outofstock')}
                />
                <Typography>Out of Stock</Typography>
            </CheckBoxContainer>
        </RootStyle>
    );
}
