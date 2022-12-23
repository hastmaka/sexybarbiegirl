// material
import {Box, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import Cell from "../cell/Cell";
import EzPriceFormat from "../../../../../components/ezComponents/EzPriceFormat/EzPriceFormat";
import EzText from "../../../../../components/ezComponents/EzText/EzText";
import EzButton from "../../../../../components/ezComponents/EzButton/EzButton";

//----------------------------------------------------------------
const btnStyle = {
    color: theme => theme.palette.ecommerce.pink,
    border: `1px solid ${'#f438de'}`,
    '&:hover': {
        color: theme => theme.palette.ecommerce.swatch_8,
        border: `1px solid ${'#fff'}`,
        backgroundColor: theme => theme.palette.ecommerce.pink,
    }
}

const CellContainer = styled(Box)(({theme}) => ({
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: '60% 40%',
    '*': {
        fontWeight: 700,
    }
}))

const ImgContainer = styled(Box)(({theme}) => ({
    padding: '10px 5px',
    borderRadius: '4px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 'px'
}))

//----------------------------------------------------------------

export default function Tr({iItem}) {
    const {amount, create_at, order_status, item} = iItem;
    let date = new Date(create_at);
    // debugger
    return (
        <CellContainer>
            <Cell>
                <Stack flexDirection='row' gap='5px'>
                    <ImgContainer>
                        {item.map(item =>
                            <img
                                key={item.variation_id}
                                src={item.image.url}
                                alt="product-image"
                                style={{borderRadius: '4px'}}
                            />
                        )}
                    </ImgContainer>
                </Stack>
            </Cell>
            <Cell sx={{gap: '5px'}}>
                <EzText text={<EzPriceFormat price={amount / 100}/>}/>
                <EzText text={date.toLocaleDateString()}/>
                <EzText text={order_status}/>
                <EzButton
                    sx={{...btnStyle}}
                >
                    Details
                </EzButton>
            </Cell>
        </CellContainer>
    )
}
