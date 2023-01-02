import { SwiperSlide} from "swiper/react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EastIcon from '@mui/icons-material/East';
//
import './TopSwiper.scss';
//
import EzButton from "../../../components/ezComponents/EzButton/EzButton";
import EzSwiper from "../../../components/ezComponents/EzSwiper/EzSwiper";
import img_1 from "../../../resources/Barbie Bikinis/web_optimized/Carousel/_LSP4867.jpg";
import {swipe1} from "./Phrase";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: 'calc(100vh - 110px)',
    '& .swiper': {
        width: '100%',
        height: '100%',
    },
    [theme.breakpoints.down(786)]: {
        height: 'calc(100vh + 75px)',
        marginTop: '-75px'
    }

}));


//----------------------------------------------------------------

export default function TopSwiper() {
    return (
        <RootStyle>
            <EzSwiper
                breakpoints={{
                    400: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    900: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    1366: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    1920: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    }
                }}
                show
                allowTouchMove
                data={[{id: 1, el: <SwiperSlide>
                    <Stack sx={{position: 'relative'}}>
                        <Stack
                            sx={{
                                position: 'absolute',
                                top: '10%',
                                left: '10%',
                                color: 'whitesmoke',
                                '& > span': {
                                    fontFamily: 'Croissant One',
                                    fontWeight: 400,
                                    fontSize: '40px',
                                    lineHeight: '100%',
                                    letterSpacing: '0.235em',
                                    textTransform: 'capitalize',
                                    color: '#FFFFFF',
                                    textShadow: '8px 11px 4px rgba(48, 48, 48, 0.5)',
                                }
                            }}
                        >
                            {swipe1.map(i => <span key={i.id}>{i.word}</span>)}
                            <EzButton
                                sx={{
                                    border: '1px solid white',
                                    p: '10px 25px',
                                    m: '45px 0',
                                    backgroundColor: '#ffffff1f',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    }
                                }}
                                endIcon={<EastIcon/>}
                            >Shop</EzButton>
                        </Stack>
                        <img src={img_1} alt="" style={{width: '100%', height: '100vh'}}/>
                    </Stack>
                </SwiperSlide>},

                    {id: 2, el: <SwiperSlide>
                        <Stack sx={{position: 'relative'}}>
                            <Stack
                                sx={{
                                    position: 'absolute',
                                    top: '10%',
                                    left: '10%',
                                    color: 'whitesmoke',
                                    '& > span': {
                                        fontFamily: 'Croissant One',
                                        fontWeight: 400,
                                        fontSize: '40px',
                                        lineHeight: '100%',
                                        letterSpacing: '0.235em',
                                        textTransform: 'capitalize',
                                        color: '#FFFFFF',
                                        textShadow: '8px 11px 4px rgba(48, 48, 48, 0.5)',
                                    }
                                }}
                            >
                                <span>All</span>
                                <span>Dreams</span>
                                <span>Come</span>
                                <span>True</span>
                                <EzButton
                                    sx={{
                                        border: '1px solid white',
                                        p: '10px 25px',
                                        m: '45px 0',
                                        backgroundColor: '#ffffff1f',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        }
                                    }}
                                    endIcon={<EastIcon/>}
                                >Shop</EzButton>
                            </Stack>
                            <img src={img_1} alt="" style={{width: '100%', height: '100vh'}}/>
                        </Stack>
                    </SwiperSlide>}]}
            />
        </RootStyle>
    );
}
