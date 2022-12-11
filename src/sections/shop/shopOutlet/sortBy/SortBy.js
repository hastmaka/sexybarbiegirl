import {useState} from "react";
// material
import {FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../components/ezComponents/EzText/EzText";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center'
}));

//----------------------------------------------------------------

export default function SortBy() {
    const [value, setValue] = useState(1);
    return (
        <RootStyle>
            <EzText text='Sort by'/>
            <FormControl
                sx={{
                    m: 1,
                    minWidth: 80,
                    outline: 0
                }}
                size='small'
                focused
            >
                <Select
                    sx={({palette}) => ({
                        borderRadius: '4px',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: palette.ecommerce.pink,
                        },
                        '&.Mui-focused': {
                            '&:hover': {
                                backgroundColor: 'rgba(255,153,236,0.16)'
                            }
                        },
                        '.MuiSelect-select': {
                            padding: '6px 14px',
                        }
                    })}
                    labelId="test"
                    id="test-id"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    autoWidth
                >
                    <MenuItem value={1}>Recommend</MenuItem>
                    <MenuItem value={2}>Most Popular</MenuItem>
                    <MenuItem value={3}>Price Low to High</MenuItem>
                    <MenuItem value={4}>Price High to Low</MenuItem>
                </Select>
            </FormControl>
        </RootStyle>
    );
}
