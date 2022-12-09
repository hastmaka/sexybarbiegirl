// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzRating from "../../../components/ezComponents/EzRating/EzRating";
import EzFormatPrice from "../../../components/ezComponents/EzFormatPrice/EzFormatPrice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    alignItems: 'center',
    flexDirection: 'row',
    width: '340px',
    height: '177px',
    borderRadius: '4px',
    background: 'rgba(255, 255, 255, 0.71)',
    border: '1px solid #E9E9E9',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    '& * span': {
        fontWeight: 700
    }
}));

//----------------------------------------------------------------

export default function HotPromotionCard({name, rating, description, price, bgImgCard}) {
    return (
        <RootStyle>
            <Stack
                sx={{
                    margin: '0 12px',
                    width: '121.37px',
                    height: '145.84px',
                    background: `url(${bgImgCard})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '4px',
                }}
            ></Stack>
            <Stack justifyContent='space-between' sx={{height: '70%'}}>
                <Typography variant='span'>{name}</Typography>
                <Stack flexDirection='row' alignItems='center' gap='5px'>
                    <EzRating
                        temValue={rating}
                        readOnly={true}
                    />
                    <Typography variant='span' sx={{filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'}}>(43)</Typography>
                </Stack>
                <Typography variant='span'>{description}</Typography>
                <Typography variant='span'>
                    <EzFormatPrice
                        color='#434343'
                        price={price}
                        justifyContent='flex-start'
                    />
                </Typography>
            </Stack>
        </RootStyle>
    );
}
