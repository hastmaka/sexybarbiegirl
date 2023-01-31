// material
import {Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
//
import EzCheckBox from '../../../../../components/ezComponents/EzCheckBox/EzCheckBox';
import CheckBoxContainer from '../../localComponents/checkBoxContainer/CheckBoxContainer';
import {useSelector} from "react-redux";
import {generalSliceActions} from "../../../../../store/gs-manager-slice";
import ClearBtn from "../../localComponents/ClearBtn";
import {shopSliceActions} from "../../../../../store/shopSlice";
import EzText from "../../../../../components/ezComponents/EzText/EzText";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between'
}));

const CategoryContainer = styled(Stack)(({theme}) => ({
    flexWrap: 'wrap',
    gap: '5px'
}));

//----------------------------------------------------------------

export default function FilterCategory() {
    const {filter} = useSelector(slice => slice.shop);
    const onCheckHandler = (category, checked) => {
        window.dispatch(shopSliceActions.setFilter({category: category, checked: checked, property: 'category'}))
    }
    return (
        <RootStyle>
            <CategoryContainer>
                {filter.category.map(({name, checked}) =>
                    <CheckBoxContainer key={name}>
                        <EzCheckBox
                            size='small'
                            checked={checked}
                            onChange={_ => onCheckHandler(name, !checked)}
                        />
                        <EzText text={name}/>
                    </CheckBoxContainer>
                )}
            </CategoryContainer>
            {filter.category.some(item => item.checked) && <ClearBtn
                onClick={_ => {
                    window.dispatch(shopSliceActions.removeFilter('category'))
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
