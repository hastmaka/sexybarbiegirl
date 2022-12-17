// material
import {Divider, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzPriceFormat from "../../../../components/ezComponents/EzPriceFormat/EzPriceFormat";
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
            <EzText text={`${left}:`} sx={{fontWeight: 500}}/>
            {number ?
                <EzText
                    text={right}
                    sx={{
                        color: '#3a3a3a',
                        fontWeight: 600,
                        fontSize: {xs: '12px', md: '16px'}
                    }}
                />
                :
                <EzText
                    text={
                        <EzPriceFormat
                            price={right}
                            priceFS={total ? 18 : 16}
                            color='#3a3a3a'
                        />
                    }
                />
            }
        </PieceContainer>
    )
}

export default function Summary({quantity, subTotal, taxes, total}) {
    // debugger
    return (
        <RootStyle>
            <EzText text='Summary'/>
            <Stack gap='5px'>
                <Piece left='Quantity' right={quantity} number/>
                <Piece left='Sub Total' right={subTotal > 0 ? subTotal : '0'}/>
                <Piece left='Taxes' right={taxes}/>
                {/*<Piece left='Fees' right={0} number/>*/}
                <Divider/>
                <Piece left='Total' right={total} total/>
            </Stack>
        </RootStyle>
    );
}