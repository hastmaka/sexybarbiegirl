// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({

}));

//----------------------------------------------------------------

export default function Td({data}) {
    return (
        <Stack
            justifyContent='center'
            sx={{
                // background: theme => theme.palette.ecommerce.pink,
                color: theme => theme.palette.ecommerce.checkBoxActive,
                letterSpacing: '1px',
                fontWeight: 700,
                height: '40px',
                textAlign: 'center',
            }}
        >{data}</Stack>
    )
}
