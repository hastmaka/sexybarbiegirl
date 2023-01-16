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
                            key={item.id}
                            stock={item.stock}
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