import {useSelector} from 'react-redux';
// material
import {Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
//
import EzCheckBox from '../../../../../components/ezComponents/EzCheckBox/EzCheckBox';
import CheckBoxContainer from '../../localComponents/checkBoxContainer/CheckBoxContainer';
import ClearBtn from "../../localComponents/ClearBtn";
import {shopSliceActions} from "../../../../../store/shopSlice";
import EzText from "../../../../../components/ezComponents/EzText/EzText";

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
                        <EzText text={name}/>
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
