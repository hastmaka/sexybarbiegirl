// material
import {Stack} from "@mui/material";

//----------------------------------------------------------------

export default function Cell({children, sx}) {
    return (
        <Stack
            justifyContent='center'
            sx={{
                backgroundColor: theme => theme.palette.grey[800],
                minHeight: '40px',
                textAlign: 'center',
                // borderRight: '1px solid lightgrey',
                // '&:nth-of-type(1)': {
                //     borderLeft: '1px solid lightgrey',
                // },
                ...sx

            }}
        >{children}</Stack>
    )
}
