// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzSkeleton from "../EzSkeleton/EzSkeleton";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    padding: '20px 0'
}));

const SkeletonContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 9px',
    height: '58px',
    width: '100%',
    border: `1px solid ${'#b6b6b6'}`,
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    gap: '9px'
}))

//----------------------------------------------------------------

export default function CreditCardSkeleton({sx}) {
    return (
        <RootStyle>
            <SkeletonContainer sx={{...sx}}>
                <EzSkeleton variant='rectangular' height='40px' width='20%' sx={{borderRadius: '4px'}}/>
                <EzSkeleton variant='rectangular' height='10px' width='60%' sx={{borderRadius: '4px'}}/>
                <EzSkeleton variant='rectangular' height='30px' width='20%' sx={{borderRadius: '4px'}}/>
            </SkeletonContainer>
        </RootStyle>
    );
}
