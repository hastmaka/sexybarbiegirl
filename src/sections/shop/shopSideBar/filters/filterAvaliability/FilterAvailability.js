// material
import {Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
//
import EzCheckBox from '../../../../../components/ezComponents/EzCheckBox/EzCheckBox';
import {useSelector} from 'react-redux';
import {shopSliceActions} from "../../../../../store/shopSlice";
import EzText from "../../../../../components/ezComponents/EzText/EzText";

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
                <EzText text='In Stock'/>
            </CheckBoxContainer>
            <CheckBoxContainer>
                <EzCheckBox
                    size='small'
                    checked={filter.availability === 'outofstock'}
                    onChange={_ => onCheckHandler('outofstock')}
                />
                <EzText text='Out of Stock'/>
            </CheckBoxContainer>
        </RootStyle>
    );
}
