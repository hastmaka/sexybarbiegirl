import {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
// material
import {Button, Divider, Link, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import IosShareIcon from '@mui/icons-material/IosShare';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
//
import EzSwiper from "../../components/ezComponents/EzSwiper/EzSwiper";
import EzRating from "../../components/ezComponents/EzRating/EzRating";
import EzPriceFormat from "../../components/ezComponents/EzPriceFormat/EzPriceFormat";
import Share from "./share/Share";
import {AddToCart, getActiveSize, getColor, getCurrentPriceAndDiscount, getVariation} from "../../helper/Helper";
import EzWishlistBtn from "../../components/ezComponents/EzWishlistBtn/EzWishlistBtn";
import {getDummy} from "./dummyData";
import ShippingInformation from "./shippingInformation/ShippingInformation";
import Description from "./description/Description";
import SizeAndFit from "./sizeAndFit/SizeAndFit";
import EzAccordion from "../../components/ezComponents/EzAccordion/EzAccordion";
import {shopSliceActions} from "../../store/shopSlice";
import EzColorAndSize from "../../components/ezComponents/EzColorAndSize/EzColorAndSize";
import EzText from "../../components/ezComponents/EzText/EzText";
//----------------------------------------------------------------

const RootStyle = styled(Stack)(({modal, theme}) => ({
    maxWidth: modal === 'true' ? '980px' : '',
    width: modal === 'true' ? '980px': '',
    backgroundColor: modal === 'true' ? '' : '#fff',
    borderRadius: '4px',
    [theme.breakpoints.down(980)]: {
        width: modal === 'true' ? '60vw' : '98vw'
    },
    [theme.breakpoints.down(600)]: {
        width: modal === 'true' ? '90vw' : '98vw'
    },
}));

const RootStyleFix = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    gap: '5px',
    padding: '5px',
    [theme.breakpoints.down(980)]: {
        flexDirection: 'column'
    }
}));

const SwiperContainer = styled(Stack)(({heightfix, theme}) => ({
    order: 0,
    width: '89px',
    gap: '5px',
    height: `${heightfix}px`,
    '& .swiper': {
        width: '100%',
        height: '100%',
        '& .swiper-wrapper': {
            // gap: '5px',
            '& .swiper-slide': {
                '& img': {
                    borderRadius: '4px'
                }
            }
        }
    },
    [theme.breakpoints.down(980)]: {
        order: 1,
        width: '100%',
        height: 'fit-content',
    }
}));

const MainSwiperImgContainer = styled(Stack)(({modal, theme}) => ({
    order: 1,
    height: '687px',
    width: '531px',
    '& .swiper': {
        width: '100%',
        height: '100%',
        borderRadius: '4px',
        '& .swiper-wrapper': {
            borderRadius: '4px',
            '& .swiper-slide': {
                '& .swiper-zoom-container': {
                    '& img': {
                        width: '100%',
                        height: '100%',
                        borderRadius: '4px'
                    }
                }

            }
        }
    },
    [theme.breakpoints.up(1400)]: {
        height: modal === 'true' ? '' : '902px',
        width: modal === 'true' ? '' : '698px',
    },
    [theme.breakpoints.down(980)]: {
        order: 0,
        width: '100%',
        height: 'fit-content',
        '& .swiper': {
            width: '100%',
            height: '100%',
            borderRadius: '4px'
        },
    },
    [theme.breakpoints.down(650)]: {
        order: 0,
        width: '100%',
        height: 'fit-content',
        '& .swiper': {
            width: '100%',
            height: '100%',
            borderRadius: '4px'
        },
    }
}));

const DetailsContainer = styled(Stack)({
    flex: 1,
    order: 3,
    justifyContent: 'space-between',
    padding: '0 20px',
    marginTop: '10px',
    borderRadius: '4px',
});

const RatingContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    gap: '5px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    [theme.breakpoints.between('sm', 'md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
}));

const PercentOffContainer = styled(Stack)(({theme}) => ({
    border: '1px solid whitesmoke',
    borderRadius: '4px',
    padding: '4px 6px',
    backgroundColor: '#ff6060'
}));

const HeaderText = styled(Typography)(({theme}) => ({
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize',
    color: theme.palette.ecommerce.inactive_color
}));

const AddToCArtButton = styled(Button)(({theme}) => ({
    color: '#FFF',
    backgroundColor: theme.palette.ecommerce.pink,
    transition: 'all 200ms',
    '&:hover': {
        backgroundColor: theme.palette.ecommerce.pink,
    },
}));

//----------------------------------------------------------------
export default function EzProductDetails({product, handleCloseCard, totalReview, modal = false}) {
    // debugger
    // const {pathname} = useLocation();
    const navigate = useNavigate();
    const {user} = useSelector(slice => slice.user);
    const {screen} = useSelector(slice => slice.generalState);
    const {id, name, image, price, category, statistic} = product;
    const variation = useMemo(() => getVariation(product.variation), [product.variation]);
    const {IMGTHUMBS, IMGMAIN} = getDummy(image);
    const isProductInWishlist = !!user ? false : user.wish_list.some(item => item.id === product.id);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(false);
    const [selected, setSelected] = useState({
        selectedColor: '',
        selectedSize: '',
        selectedColorToRender: [],
        variationToRender: []
    });

    useEffect(_ => {
        setSelected({
            ...selected,
            selectedColor: Object.entries(variation)[0][0],
            selectedSize: getActiveSize(Object.entries(variation)[0][1]),
            variationToRender: variation[Object.entries(variation)[0][0]],
            selectedColorToRender: getColor(variation)
        })
        setSelectedStatus(true)
    }, [product]);

    useEffect(_ => {
        if(selectedStatus)
        setSelected({
            ...selected,
            priceAndDiscount: {...getCurrentPriceAndDiscount(selected)}
        })
    }, [selectedStatus, selected.selectedColor, selected.selectedSize])


    const ITEMS = [{
        id: 1, title: 'Shipping Info', element: <ShippingInformation/>
    }, {
        id: 2, title: 'Description', element: <Description item={product}/>
    }, {
        id: 3, title: 'Size and Fit', element: <SizeAndFit/>
    }];

    return (
        <RootStyle modal={modal.toString()}>
            <RootStyleFix>
                {/*thumbs*/}
                <SwiperContainer heightfix={115 * image.length}>
                    <EzSwiper
                        loop={true}
                        lazy={true}
                        onSwiper={setThumbsSwiper}
                        allowTouchMove
                        watchSlidesProgress={true}
                        spaceBetween={screen >= 980 ? 20 : 5}
                        slidesPerView={image.length}
                        data={IMGTHUMBS}
                        // freeMode
                        show
                        direction={screen >= 980 ? 'vertical' : 'horizontal'}
                    />
                </SwiperContainer>
                {/*main image*/}
                <MainSwiperImgContainer modal={modal.toString()}>
                    <EzSwiper
                        loop={true}
                        lazy={true}
                        navigation={true}
                        allowTouchMove
                        spaceBetween={screen >= 980 ? 0 : 5}
                        slidesPerView={1}
                        data={IMGMAIN}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        show
                        zoom={{maxRatio: 2}}
                        onZoomChange={(swiper, scale, imageEl, slideEl) => {
                            //check if img is zoomed and disable slider
                        }}
                    />
                </MainSwiperImgContainer>
                {/*detail section*/}
                <DetailsContainer>
                    <Stack gap='10px'>
                        <HeaderText variant='h6'>{name}</HeaderText>
                        <HeaderText variant='span'>SKU: {id}</HeaderText>
                        <RatingContainer>
                            <EzRating
                                readOnly
                                temValue={statistic.average_rating}
                            />
                            <HeaderText variant='span'>({totalReview} reviews)</HeaderText>
                        </RatingContainer>
                        <Stack flexDirection='row' gap='5px' alignItems='center' sx={{height: '30px'}}>
                            {selected?.priceAndDiscount?.discount > 0 &&
                                <EzPriceFormat
                                    price={selected.priceAndDiscount.price - ((selected.priceAndDiscount.discount / 100) * price)}
                                    priceFS={18}
                                    justifyContent={'left'}
                                />
                            }
                            {!!price &&
                                <EzPriceFormat
                                    price={selected?.priceAndDiscount?.price}
                                    priceFS={selected?.priceAndDiscount?.discount > 0 ? 14 : 18}
                                    oldPrice={selected?.priceAndDiscount?.discount > 0}
                                />
                            }

                            {selected?.priceAndDiscount?.discount > 0 &&
                                <PercentOffContainer>
                                    <EzText text={`${selected.priceAndDiscount.discount}% Off`} sx={{color: 'whitesmoke'}}/>
                                </PercentOffContainer>
                            }
                        </Stack>
                        <Divider/>
                        {/*color and size*/}
                         <EzColorAndSize
                            variant={selected.variationToRender}
                            selectedColor={selected.selectedColor}
                            selectedSize={selected.selectedSize}
                            selectedColorToRender={selected.selectedColorToRender}
                            onColorClick={e => setSelected(prev => {
                                return {
                                    ...prev,
                                    selectedColor: e,
                                    selectedSize: getActiveSize(variation[e]),
                                    variationToRender: variation[e]
                                }
                            })}
                            onSizeClick={e => setSelected(prev => {
                                return {
                                    ...prev,
                                    selectedSize: e
                                }
                            })}
                        />
                        <Stack gap='5px'>
                            <HeaderText variant='span' sx={{fontSize: '14px'}}>Description</HeaderText>
                            <HeaderText variant='span' sx={{fontSize: '11px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda aut beatae blanditiis cupiditate doloremque enim facilis, minus nam natus nemo numquam pariatur quaerat quasi repellat repudiandae sint, veniam voluptate!</HeaderText>
                        </Stack>
                        {/*Categories*/}
                        <Stack flexDirection='row' gap='2px' alignItems='baseline'>
                            <HeaderText variant='span' sx={{fontSize: '14px'}}>Categories: </HeaderText>
                            {category.map((item, index) =>
                                <HeaderText
                                    key={item}
                                    variant='span'
                                    sx={({palette}) => ({
                                        fontSize: '14px',
                                        color: palette.ecommerce.pink
                                    })}
                                >
                                    {(index ? ', ' : '') + item}
                                </HeaderText>
                            )}
                        </Stack>
                        {/*Share*/}
                        <Stack flexDirection='row' gap='2px' alignItems='center'>
                            <HeaderText variant='span' sx={{fontSize: '16px'}}>Share: </HeaderText>
                            <Share
                                link={`https://sexybarbiegirl-f6068.web.app/full-detail/${id}`}
                                data={[{
                                    social: 'Facebook',
                                    icon: <FacebookRoundedIcon/>
                                }, {
                                    social: 'Email',
                                    icon: <EmailIcon/>
                                }, {
                                    social: 'Whatsapp',
                                    icon: <WhatsAppIcon/>
                                }, {
                                    social: 'Copy-to-clipboard',
                                    icon: <IosShareIcon/>
                                }]}
                            />
                        </Stack>
                        {modal ?
                            <Link
                                onClick={_ => {
                                    window.dispatch(shopSliceActions.setSingleProduct(product))
                                    navigate(`/full-detail/${id}`)
                                    handleCloseCard()
                                }}
                                sx={{
                                    paddingTop: '5px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    color: 'rgba(73,138,252,0.93)',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    }
                                }}
                            >View Full Details</Link> :
                            // description
                            ITEMS.map(item =>
                                <EzAccordion
                                    key={item.id}
                                    title={item.title}
                                    element={item.element}
                                />
                            )
                        }
                    </Stack>

                    <Stack flexDirection='row' sx={{margin: '20px 0 20px 0', gap: '10px'}}>
                        <AddToCArtButton
                            onClick={_ => AddToCart(selected.selectedColor, selected.selectedSize, product, id, image, name, user)}
                            variant='outlined'
                            sx={{flex: 2}}
                        >Add to cart</AddToCArtButton>
                        <EzWishlistBtn
                            product={product}
                            user={user}
                            isProductInWishlist={isProductInWishlist}
                        />
                    </Stack>
                </DetailsContainer>
            </RootStyleFix>
        </RootStyle>
    );
}
