// material
import {Box, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import Cell from "../cell/Cell";
import EzFormatPrice from "../../../../../components/ezComponents/EzFormatPrice/EzFormatPrice";

//----------------------------------------------------------------

const ImgContainer = styled(Box)(({theme}) => ({
    padding: '10px 5px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: 'px'
}))

//----------------------------------------------------------------

export default function Tr({iItem}) {
    const {amount, create_at, order_status, item} = iItem;
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'minmax(100px, 1.5fr) 1fr .3fr .4fr',
                    md: 'minmax(100px, 1.5fr) 1fr .6fr .4fr'
                },
                '*': {
                    fontWeight: 700,
                }
            }}
        >
            <Cell>
                <Stack flexDirection='row' gap='5px'>
                    <ImgContainer>
                        {item.map(item =>
                            <img key={item.variation_id} src={item.image.url} alt="product-image"/>
                        )}
                    </ImgContainer>
                </Stack>
            </Cell>
            <Cell>
                <Typography
                    variant='span'
                >
                    <EzFormatPrice
                        price={amount / 100}
                        color='#3a3a3a'
                    />
                </Typography>
            </Cell>
            <Cell>
                <Typography variant='span'>{create_at}</Typography>
            </Cell>
            <Cell>
                <Typography variant='span'>{order_status}</Typography>
            </Cell>
        </Box>
    )
}
