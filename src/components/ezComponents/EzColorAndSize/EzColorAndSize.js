// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzColorPicker from "../EzColorPicker/EzColorPicker";
import EzSizePicker from "../EzSizePicker/EzSizePicker";
import EzHeaderText from "../EzCommon/EzHeaderText";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '15px'
}));

//----------------------------------------------------------------

export default function EzColorAndSize({
    selectedColor,
    selectedSize,
    variant,
    selectedColorToRender,
    onColorClick,
    onSizeClick
    }) {
    return (
        <RootStyle>
            <Stack gap='10px'>
                <EzHeaderText
                    variant='span'
                    sx={{
                        fontSize: '14px'
                    }}
                >
                    Color: {selectedColor}
                </EzHeaderText>
                <Stack flexDirection='row' gap='10px'>
                    {selectedColorToRender.map(item =>
                        <EzColorPicker
                            key={item}
                            checked={item === selectedColor}
                            backgroundColor={item}
                            onClick={_ => onColorClick(item)}
                        />
                    )}
                </Stack>
            </Stack>

            <Stack gap='10px'>
                <EzHeaderText
                    variant='span'
                    sx={{
                        fontSize: '14px'
                    }}
                >
                    Size: (EU)
                </EzHeaderText>
                <Stack flexDirection='row' gap='10px'>
                    {variant.map(item =>
                        <EzSizePicker
                            active={item.active}
                            key={item.id}
                            checked={item.size === selectedSize}
                            onClick={_ => onSizeClick(item.size)}
                            size={item.size}
                        />
                    )}
                </Stack>
            </Stack>
        </RootStyle>
    );
}

/**
 * Data structure converted from server with getVariation Helper
 * export const variation = [{
 *     pink: [{
 *         active: false,
 *         discount: 0,
 *         id: 771129655101.3947,
 *         price: 32.99,
 *         size: 1,
 *         stock: 10
 *     }, {
 *         active: true,
 *         discount: 0,
 *         id: 725429655101.3947,
 *         price: 32.99,
 *         size: 2,
 *         stock: 10
 *     }, {
 *         active: true,
 *         discount: 0,
 *         id: 725129655101.3947,
 *         price: 32.99,
 *         size: 3,
 *         stock: 10
 *     }]
 * }, {
 *     red: [{
 *         active: true,
 *         discount: 0,
 *         id: 221129655101.3947,
 *         price: 32.99,
 *         size: 1,
 *         stock: 10
 *     }, {
 *         active: false,
 *         discount: 0,
 *         id: 115429655101.3947,
 *         price: 32.99,
 *         size: 2,
 *         stock: 10
 *     }, {
 *         active: true,
 *         discount: 0,
 *         id: 125129655101.3947,
 *         price: 32.99,
 *         size: 3,
 *         stock: 10
 *     }, {
 *         active: false,
 *         discount: 0,
 *         id: 121144655101.3947,
 *         price: 32.99,
 *         size: 4,
 *         stock: 10
 *     }]
 * }]
 */