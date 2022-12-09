// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({

}));

//----------------------------------------------------------------

export default function Cell(props) {
    return (
        <Stack
            justifyContent='center'
            sx={{
                backgroundColor: '#fff',
                minHeight: '40px',
                borderBottom: '1px solid #e9e9e9',
                textAlign: 'center',
                // borderRight: '1px solid lightgrey',
                // '&:nth-of-type(1)': {
                //     borderLeft: '1px solid lightgrey',
                // },
                ...props.sx
            }}
        >{props.children}</Stack>
    )
}
