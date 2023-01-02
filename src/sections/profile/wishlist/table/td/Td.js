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
                // background: theme => theme.palette.ecommerce.pink_3,
                color: theme => theme.palette.ecommerce.checkBoxActive,
                letterSpacing: '1px',
                fontWeight: 700,
                height: '40px',
                // borderBottom: '1px solid lightgrey',
                textAlign: 'center',
                // '&:not(:last-child)': {
                //     borderRight: '1px solid lightgrey',
                // }
            }}
        >{data}</Stack>
    )
}
