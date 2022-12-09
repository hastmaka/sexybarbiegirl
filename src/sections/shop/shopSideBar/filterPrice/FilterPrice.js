import {useEffect, useState} from 'react';
// material
import {Stack, Typography} from '@mui/material';
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';
import {useSelector} from 'react-redux';
import {generalSliceActions} from '../../../../store/gs-manager-slice';
import ClearBtn from "../localComponents/ClearBtn";
import {shopSliceActions} from "../../../../store/shopSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row'
}));

//----------------------------------------------------------------

export default function FilterPrice() {
    const {filter, priceRange} = useSelector(slice => slice.shop);
    const [value, setValue] = useState({});
    const handleChange = (event, newValue) => {
        setValue(prevState => {
            return {
                ...prevState,
                visualMin: newValue[0],
                visualMax: newValue[1]
            }
        })
    };
    // debugger
    useEffect(_ => {
        if (value.visualMin !== priceRange[0] || value.visualMax !== priceRange[1]) {
            if (priceRange[0] === filter.priceRange[0] && priceRange[1] === filter.priceRange[1]) {
                setValue({
                    sliderMin: priceRange[0],
                    sliderMax: priceRange[1],
                    visualMin: priceRange[0],
                    visualMax: priceRange[1],
                });
            }
        }
    }, [filter])


    const handleChangeCommitted = (event, newValue) => {
        window.dispatch(shopSliceActions.setFilter({priceRange: [...newValue], property: 'priceRange'}))
    }

    return (
        <RootStyle>
            <Stack width='98%'>
                <Slider
                    value={[value.visualMin, value.visualMax]}
                    onChange={(e, newValue) => handleChange(e, newValue)}
                    onChangeCommitted={(e, newValue) => handleChangeCommitted(e, newValue)}
                    disableSwap
                    size='small'
                    valueLabelDisplay="auto"
                    min={value.sliderMin}
                    max={value.sliderMax}
                />
                <Stack flexDirection='row' justifyContent='space-between'>
                    <Typography variant='span'>US$ {value.visualMin}</Typography>
                    <Typography variant='span'>US$ {value.visualMax}</Typography>
                </Stack>
            </Stack>
            {(priceRange[0] !== filter.priceRange[0] || priceRange[1] !== filter.priceRange[1]) &&
                <ClearBtn
                    onClick={_ => {
                        window.dispatch(shopSliceActions.removeFilter('priceRange'))
                    }}
                    tooltip='Clear Price'
                    sx={{
                        position: 'relative',
                        top: '-5px',
                        left: '15px'
                    }}
                />}

        </RootStyle>
    );
}
