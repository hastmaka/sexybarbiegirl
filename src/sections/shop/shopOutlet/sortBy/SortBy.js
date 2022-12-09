import {useState} from "react";
// material
import {FormControl, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center'
}));

//----------------------------------------------------------------

export default function SortBy() {
    const [age, setAge] = useState(1);
    return (
        <RootStyle>
            <Typography variant='span'>Sort by</Typography>
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
                    sx={{
                        borderRadius: 0,
                        '.MuiSelect-select': {
                            padding: '6px 14px',
                        },

                    }}
                    labelId="test"
                    id="test-id"
                    value={age}
                    onChange={e => setAge(e.target.value)}
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
