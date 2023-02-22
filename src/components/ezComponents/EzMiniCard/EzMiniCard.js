// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import EzText from "../EzText/EzText";
import EzPriceFormat from "../EzPriceFormat/EzPriceFormat";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    cursor: 'pointer',
    borderRadius: '4px',
    flexDirection: 'row',
    padding: '6px',
    gap: '15px',
    margin: '10px 15px 0 15px',
    border: '1px solid rgba(212 212 212 / 62%)',
    boxShadow: '0 0px 1px rgba(0, 0, 0, 0.1)',
    transition: 'all 200ms',
    '&:hover': {
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
}));

//----------------------------------------------------------------

export default function EzMiniCard({item, image, name, price, handleOpen}) {
    return (
        <RootStyle
            onClick={_ => {
                handleOpen()
            }}
        >
            <Stack
                sx={{
                    height: '80px',
                    width: '68px',
                    borderRadius: '4px'
                }}
            >
                <img
                    src={image}
                    alt="new-products"
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: '4px'
                    }}
                />
            </Stack>
            <Stack
                sx={{
                    justifyContent: 'space-evenly'
                }}
            >
                <EzText text={name}/>
                <EzText text={<EzPriceFormat price={price}/>}/>
            </Stack>
        </RootStyle>
    );
}
