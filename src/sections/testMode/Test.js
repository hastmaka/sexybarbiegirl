// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../components/ezComponents/EzText/EzText";
import EzSimpleLink from "../../components/ezComponents/EzSimpleLink/EzSimpleLink";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    // width: '20%',
    // backgroundAttachment: 'fixed',
    // backgroundColor: '#d52525',
    // backgroundImage: `url(${a})`,
    // backgroundSize: '20% 600px',
    // backgroundPosition: 'left 0 bottom 0',
    // backgroundRepeat: 'no-repeat'
}));
//----------------------------------------------------------------

export default function Test() {
    return (
        <RootStyle>
            <Stack
                border={1}
                sx={{
                    borderRadius: '4px',
                    width: '1080px',
                    height: '680px',
                    padding: '30px',
                    gap: '20px'
                }}
            >
                {/*<Stack>*/}
                {/*    <EzText*/}
                {/*        text='Order Details'*/}
                {/*        sx={{*/}
                {/*            paddingBottom: '10px',*/}
                {/*            fontSize: '24px'*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Stack>*/}
                {/*/!*top-section*!/*/}
                {/*<Stack>*/}
                {/*    <Stack flexDirection='row' justifyContent='space-between' pb={1}>*/}
                {/*        <Stack flexDirection='row' gap='20px'>*/}
                {/*            <EzText text='Ordered on November 15, 2022'/>*/}
                {/*            <EzText text='|'/>*/}
                {/*            <EzText text='Order Id - UMGTu50o64ggHHT5mreg5rH1znxL'/>*/}
                {/*        </Stack>*/}
                {/*        <Stack>*/}
                {/*            <EzSimpleLink text='View Invoice' to=''/>*/}
                {/*        </Stack>*/}
                {/*    </Stack>*/}

                {/*    <Stack flexDirection='row' border={1} sx={{borderRadius: '4px'}}>*/}
                {/*        <Stack flex={1} p={1} gap='10px'>*/}
                {/*            <EzText text='Shipping Address' sx={{fontSize: '14px'}}/>*/}
                {/*            <Stack>*/}
                {/*                <span>Luis Castro</span>*/}
                {/*                <span>400 Tamiami Blvd, 33160</span>*/}
                {/*                <span>Florida</span>*/}
                {/*            </Stack>*/}
                {/*        </Stack>*/}

                {/*        <Stack flex={1} p={1} gap='10px'>*/}
                {/*            <EzText text='Payment Method' sx={{fontSize: '14px'}}/>*/}
                {/*            <Stack>*/}
                {/*                <span>Debit **** 3525</span>*/}
                {/*            </Stack>*/}
                {/*        </Stack>*/}

                {/*        <Stack flex={1} p={1} gap='10px'>*/}
                {/*            <EzText text='Order Summary' sx={{fontSize: '14px'}}/>*/}
                {/*            <Stack>*/}
                {/*                <Stack flexDirection='row' justifyContent='space-between'>*/}
                {/*                    <span>Item(s) Subtotal</span>*/}
                {/*                    <EzText text='$26.96'/>*/}
                {/*                </Stack>*/}
                {/*                <Stack flexDirection='row' justifyContent='space-between'>*/}
                {/*                    <span>Shipping and Handling</span>*/}
                {/*                    <EzText text='$0'/>*/}
                {/*                </Stack>*/}
                {/*                <Stack flexDirection='row' justifyContent='space-between'>*/}
                {/*                    <span>Total before Tax</span>*/}
                {/*                    <EzText text='$26.96'/>*/}
                {/*                </Stack>*/}
                {/*                <Stack flexDirection='row' justifyContent='space-between'>*/}
                {/*                    <span>Tax</span>*/}
                {/*                    <EzText text='$2.54'/>*/}
                {/*                </Stack>*/}
                {/*                <Stack flexDirection='row' justifyContent='space-between'>*/}
                {/*                    <span>Gran Total</span>*/}
                {/*                    <EzText text='$26.96'/>*/}
                {/*                </Stack>*/}
                {/*            </Stack>*/}
                {/*        </Stack>*/}
                {/*    </Stack>*/}
                {/*</Stack>*/}
                {/*/!*bottom-section*!/*/}
                {/*<Stack>*/}
                {/*    <Stack pb={1}>*/}
                {/*        <EzText text='Item(s)'/>*/}
                {/*    </Stack>*/}

                {/*    <Stack flexDirection='row' border={1} sx={{borderRadius: '4px'}}>*/}
                {/*        */}
                {/*    </Stack>*/}
                {/*</Stack>*/}
            </Stack>
        </RootStyle>
    );
}
