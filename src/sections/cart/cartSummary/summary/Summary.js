// material
import {Divider, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzFormatPrice from "../../../../components/ezComponents/EzFormatPrice/EzFormatPrice";
import EzText from "../../../../components/ezComponents/EzText/EzText";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '20px',
}));

const PieceContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between'
}))

//----------------------------------------------------------------

const Piece = ({left, right, number, total}) => {
    return (
        <PieceContainer>
            <Typography
                variant='span'>
                {left}:
            </Typography>
            {number ?
                <Typography
                    variant='span'
                    sx={{
                        color: '#3a3a3a',
                        fontWeight: 600,
                        fontSize: {xs: '12px', md: '16px'}
                    }}
                >
                    {right}
                </Typography> :
                <Typography
                    variant='span'
                >
                    <EzFormatPrice
                        price={right}
                        priceFS={total ? 18 : 16}
                        color='#3a3a3a'
                    />
                </Typography>
            }
        </PieceContainer>
    )
}

export default function Summary({quantity, subTotal, taxes, total}) {
    return (
        <RootStyle>
            <EzText text='Summary'/>
            <Stack gap='5px'>
                <Piece left='Quantity' right={quantity} number/>
                <Piece left='Sub Total' right={subTotal}/>
                <Piece left='Taxes' right={taxes}/>
                {/*<Piece left='Fees' right={0} number/>*/}
                <Divider/>
                <Piece left='Total' right={total} total/>
            </Stack>
        </RootStyle>
    );
}