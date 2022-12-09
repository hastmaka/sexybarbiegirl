import {useSelector} from "react-redux";
// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import HotPromotionComponent from "./HotPromotionComponent";
import bg_img from '../../../resources/Barbie Bikinis/web_optimized/mac_hot_promotion_section.jpg';
import bgImgCard from '../../../resources/Barbie Bikinis/web_optimized/_LSP5209.jpg';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    padding: '0 50px 60px 50px',
    justifyContent: 'center',
    backgroundColor: '#fff',
    [theme.breakpoints.down(786)]: {
        padding: 0
    }
}));

const HeaderContainer = styled(Stack)(({theme}) => ({
    padding: '30px 0 30px 50px',
    flexDirection: 'row',
    gap: '4px',
    justifyContent: 'flex-start',
    [theme.breakpoints.down(786)]: {
        padding: '30px 0 30px 20px'
    }
}))

const Child = styled(Stack)(({theme}) => ({
    // border: `1px solid ${'#d2d2d2'}`,
    height: '470px',
    maxWidth: '529px',
    [theme.breakpoints.down(786)]: {
        height: '354px'
    }
}))

//----------------------------------------------------------------

export default function HotPromotion() {
    const {screen} = useSelector(slice => slice.generalState);
    return (
        <RootStyle>
            <HeaderContainer>
                <Typography variant='span' sx={{fontWeight: 500, fontSize: '14px'}}>Hot</Typography>
                <Typography
                    variant='span'
                    sx={({palette}) => ({
                        fontWeight: 700,
                        fontSize: '14px',
                        color: palette.ecommerce.pink
                    })}
                >
                    Promotions
                </Typography>
            </HeaderContainer>
            <Stack flexDirection='row' gap='50px' justifyContent='center'>
                <Child flex={1}>
                    <HotPromotionComponent
                        time={1}
                        bgImg={bg_img}
                        bgImgCard={bgImgCard}
                        name='Bikini'
                        rating={4.5}
                        description='Short Description'
                        price={32.99}
                    />
                </Child>
                {screen >= 786 && <Child flex={1}>
                    <HotPromotionComponent
                        time={1}
                        bgImg={bg_img}
                        bgImgCard={bgImgCard}
                        name='Bikini'
                        rating={4.5}
                        description='Short Description'
                        price={32.99}
                    />
                </Child>}
            </Stack>
        </RootStyle>
    );
}
