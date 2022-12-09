// material
import {Avatar, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzRating from "../../../components/ezComponents/EzRating/EzRating";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flex: 1,
    flexDirection: 'row',
    gap: '10px',
    padding: '10px',
    borderRadius: '4px',
    margin: '0 0 0 10px',
    border: ' 1px solid #e1e1e175',
    boxShadow: theme.shadows[1],
    [theme.breakpoints.down(786)]: {
        margin: '0 10px'
    }

}));

//----------------------------------------------------------------

export default function ReviewCard({img, email, date, rating, content}) {
    return (
        <RootStyle>
            <Avatar sx={{textTransform: 'capitalize'}}>{email.substr(0, 1)}</Avatar>
            <Stack width='100%' gap='10px'>
                <Stack flexDirection='row' justifyContent='space-between'>
                    <Stack>
                        <Typography variant='span' sx={{fontWeight: 700, color: '#2b2a34'}}>{email}</Typography>
                        <Typography variant='span' sx={{fontWeight: 600}}>
                            {new Date(date).toDateString()}
                        </Typography>
                    </Stack>
                    <EzRating
                        temValue={rating}
                        readOnly
                    />
                </Stack>
                <Stack>
                    <Typography variant='span' sx={{fontWeight: 500}}>{content}</Typography>
                </Stack>
            </Stack>
        </RootStyle>
    );
}
