// material
import {Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
//
import {useSelector} from 'react-redux';
import EzColorPicker from '../../../../components/ezComponents/EzColorPicker/EzColorPicker';
import {generalSliceActions} from '../../../../store/gs-manager-slice';
import ClearBtn from "../localComponents/ClearBtn";
import {shopSliceActions} from "../../../../store/shopSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
}));

const ColorContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '5px'
}));

//----------------------------------------------------------------

export default function FilterColor() {
    const {filter} = useSelector(slice => slice.shop);
    const filterColorHandler = (color, checked) => {
        window.dispatch(shopSliceActions.setFilter({color: color, checked: checked, property: 'color'}))
    }
    return (
        filter?.color?.length && <RootStyle>
            <ColorContainer>
                {filter.color.map(({name, checked}) => {
                        return <EzColorPicker
                            key={name}
                            backgroundColor={name}
                            onClick={_ => filterColorHandler(name, !checked)}
                            checked={checked}
                        />
                    }
                )}
            </ColorContainer>
            {filter.color.some(item => item.checked) && <ClearBtn
                onClick={_ => {
                    window.dispatch(shopSliceActions.removeFilter('color'))
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
