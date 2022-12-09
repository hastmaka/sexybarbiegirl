// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const ContentText = styled(Typography)(({theme}) => ({
    flex: 1,
    color: '#9b95c2',
    lineHeight: '20px',
    fontWeight: 600
}));

//----------------------------------------------------------------

export default function Description({item}) {
    const {care_instructions, composition, details, fit_type, material, type, waist} = item.description;
    const ITEMS = [{
        id: 1, label: 'Care Instruction', value: care_instructions
    }, {
        id: 2, label: 'Composition', value: composition
    }, {
        id: 3, label: 'Details', value: details
    }, {
        id: 4, label: 'Fit Type', value: fit_type
    }, {
        id: 5, label: 'Material', value: material
    }, {
        id: 6, label: 'Type', value: type
    }, {
        id: 7, label: 'Waist', value: waist
    }]
    return (
        <>
            {ITEMS.map(item =>
                <Stack key={item.id} flexDirection='row'>
                    <ContentText variant='span'>{`${item.label} :`}</ContentText>
                    <ContentText variant='span'>{item.value}</ContentText>
                </Stack>
            )}
        </>
    );
}
