import {useSelector} from 'react-redux';
// material
import {Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
//
import EzCheckBox from '../../../../../components/ezComponents/EzCheckBox/EzCheckBox';
import CheckBoxContainer from '../../localComponents/checkBoxContainer/CheckBoxContainer';
import {generalSliceActions} from '../../../../../store/gs-manager-slice';
import ClearBtn from "../../localComponents/ClearBtn";
import {shopSliceActions} from "../../../../../store/shopSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row'
}));

const SizeContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '5px'
}));

const BadgeContainer = styled(Stack)(({theme}) => ({
    border: '1px solid lightgrey',
    borderRadius: '5px',
    color: theme.palette.ecommerce.swatch_2,
    padding: '0 5px',
    margin: '-10px 0 0 10px',
    backgroundColor: theme.palette.ecommerce.pink
}));

//----------------------------------------------------------------

export default function FilterSize() {
    const {filter} = useSelector(slice => slice.shop);
    const onCheckHandler = (size, checked) => {
        window.dispatch(shopSliceActions.setFilter({size: size, checked: checked, property: 'size'}))
    }
    return (
        <RootStyle>
            <SizeContainer>
                {filter.size.map(({name, checked}) =>
                    <CheckBoxContainer key={name} sx={{width: '45%'}}>
                        <EzCheckBox
                            size='small'
                            checked={checked}
                            onChange={_ => onCheckHandler(name, !checked)}
                        />
                        <Typography>{name === 1 ? 'XS' : name === 2 ? 'S' : name === 3 ? 'M' : name === 4 ? 'L' : name === 5 ? 'XL' : ''}</Typography>
                    </CheckBoxContainer>
                )}
            </SizeContainer>
            {filter.size.some(item => item.checked) && <ClearBtn
                onClick={_ => {
                    window.dispatch(shopSliceActions.removeFilter('size'))
                }}
                tooltip='Clear Color'
                sx={{
                    position: 'relative',
                    top: '-5px',
                    left: '15px'
                }}
            />}
        </RootStyle>
    );
}
