// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../components/ezComponents/EzText/EzText";
import EzPriceFormat from "../../../../components/ezComponents/EzPriceFormat/EzPriceFormat";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row'
}));

const ImageContainer = styled(Stack)(({theme}) => ({
    width: '100px',
    borderRadius: '4px'
}));


//----------------------------------------------------------------

export default function OrderProduct({img, price, size, name, color}) {
    return (
        <RootStyle>
            <ImageContainer>
                <img
                    src={img.url}
                    alt="order-product"
                    style={{borderRadius: '4px'}}
                />
            </ImageContainer>
            <Stack p={1} justifyContent='center' gap='5px'>
                <Stack flexDirection='row'>
                    <EzText text='Name: '/>
                    <EzText text={name}/>
                </Stack>
                <Stack flexDirection='row'>
                    <EzText text='Color: '/>
                    <EzText text={color}/>
                </Stack>
                <Stack flexDirection='row'>
                    <EzText text='Size: '/>
                    <EzText text={size}/>
                </Stack>
                <Stack flexDirection='row' alignItems='center'>
                    <EzText text='Price: '/>
                    <EzText text={<EzPriceFormat price={price}/>}/>
                </Stack>
            </Stack>
        </RootStyle>
    );
}
