import {useSelector} from "react-redux";
// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
// import Swiper core and required modules
import EzSwiper from "../../../components/ezComponents/EzSwiper/EzSwiper";
import EzSimpleLink from "../../../components/ezComponents/EzSimpleLink/EzSimpleLink";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.down(1432)]: {
        padding: '0 40px'
    },
    [theme.breakpoints.down(1366)]: {
        padding: '0 20px'
    },
    [theme.breakpoints.down(900)]: {
        padding: '0 10px'
    },
}));

const HeaderContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'100%',
    backgroundColor: '#EDEDED',
    padding: '30px 50px 30px 50px',
    [theme.breakpoints.down(786)]: {
        padding: '30px 20px 30px 20px'
    }
}));

const RootFix = styled(Stack)(({theme}) => ({
    // borderBottom: '1px solid black',
    maxWidth: '1432px',
    width: '100%',
    height: '587px',
    '& .swiper': {
        backgroundColor: '#EDEDED',
        width: '100%',
        height: '100%',
        '& .swiper-wrapper': {
            '& .swiper-slide': {
                // width: screen === 'desktop' ? '292px !important' : '208px !important',
            },
            '& .swiper-slide-active': {
                // marginLeft: `${fixmargin}px`
            }
        },
        '& .swiper-pagination': {
            bottom: '6px',
            '& .swiper-pagination-bullet-active': {
                width: '12px',
                height: '12px',
                backgroundColor: theme.palette.ecommerce.pink
            }
        }
    },
    [theme.breakpoints.down(786)]: {
        height: '485px',
        '& .swiper': {
            '& .swiper-pagination': {
                bottom: '50px'
            }
        }
    }
}));

//----------------------------------------------------------------

export default function HomeSectionComponent({blackText, pinkText, simpleLink, product}) {
    const {screen} = useSelector(slice => slice.generalState)
    return (
        <RootStyle>
            <RootFix>
                <HeaderContainer>
                    <Stack flexDirection='row' gap='4px'>
                        <Typography variant='span' sx={{fontWeight: 700, fontSize: '14px'}}>{blackText}</Typography>
                        <Typography
                            variant='span'
                            sx={({palette}) => ({
                                fontWeight: 700,
                                fontSize: '14px',
                                color: palette.ecommerce.pink
                            })}
                        >
                            {pinkText}
                        </Typography>
                    </Stack>
                    <EzSimpleLink text={simpleLink} to='/shop'/>
                </HeaderContainer>
                <EzSwiper
                    data={product}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    navigation
                    freeMode
                    allowTouchMove={screen <= 786}
                    breakpoints={{
                        400: {
                            slidesPerView: 2,
                            spaceBetween: 4
                        },
                        600: {
                            slidesPerView: 3,
                            spaceBetween: 4,
                        },
                        900: {
                            slidesPerView: 4,
                            spaceBetween: 16
                        },
                        1366: {
                            slidesPerView: 4,
                            spaceBetween: 16
                        },
                        1920: {
                            slidesPerView: 6,
                            spaceBetween: 8
                        }
                    }}
                />
            </RootFix>
        </RootStyle>
    );
}
