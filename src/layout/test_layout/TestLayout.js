// material
import {Box, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
}));

//----------------------------------------------------------------

export default function TestLayout() {
    return (
        <>
            <Stack sx={{width: '100%', position: 'relative', minHeight: '100vh'}}>
                <Stack border={1}
                       sx={{
                           height: '80px',
                           position: 'sticky',
                           top: 0,
                           backgroundColor: '#f8f8f8'
                }}>Header</Stack>
                <Stack border={1} flexDirection='row' sx={{flexGrow: 1}}>
                    <Stack border={1} sx={{width: '250px'}}>sidebar</Stack>
                    <Stack border={1} sx={{flex: 1, padding: '20px', flexDirection: 'row', flexWrap: 'wrap', gap: '10px'}}>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                        <Box border={1} sx={{width: '240px', height: '350px'}}></Box>
                    </Stack>

                </Stack>

                <Stack border={1} sx={{height: '80px', width: '100%'}}>Footer</Stack>
            </Stack>

        </>
    );
}
