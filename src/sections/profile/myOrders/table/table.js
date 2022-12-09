// material
import {Box, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import Td from "./td/Td";
import Tr from "./tr/Tr";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function Table({td, tr}) {
    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridGap: '1px',
                    gridTemplateColumns: 'minmax(100px, 1.5fr) 1fr .6fr .4fr'
                }}
            >
                {td.map(item =>
                    <Td
                        key={item}
                        data={item}
                    />
                )}
            </Box>

            {tr.map(item => {
                // debugger
                return <Tr
                    key={item.id}
                    iItem={item}
                />
            })}
        </>
    )
}
