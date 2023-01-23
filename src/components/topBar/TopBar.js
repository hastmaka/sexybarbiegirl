import {useNavigate} from "react-router-dom";
import {useRef, useState} from 'react';
import {useOnClickOutside} from '../../helper/Hooks';
import {useSelector} from "react-redux";
// material
import {Divider, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
//
import BannerSection from './bannerSection/BannerSection';
import Menu from './menu/Menu';
import Burger from './burger/Burger';
import Logo from '../../resources/Asset 56@2x.png';
import EzSetOfIcons from '../ezComponents/EzSetOfIcons/EzSetOfIcons';
import EzMenu from "../ezComponents/EzMenu/EzMenu";
import {generalSliceActions} from "../../store/gs-manager-slice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({scrolltop, theme}) => ({
    height: '110px',
    // borderBottom: '1px solid lightgrey',
    boxShadow: scrolltop === 0 ? '' : '0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);',
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    [theme.breakpoints.down(786)]: {
        height: '75px'
    }
}));

const Header = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '75px',
    padding: '0 10px'
}));

const Overlay = styled(Stack)(({theme}) => ({
    position: 'fixed',
    top: 0,
    /*left: 386px;*/
    right: '100%',
    width: '100vw',
    height: '100vh',
    background: 'rgba(56, 56, 56, 0.59)',
    transform: 'translateX(0)',
    transition: 'transform .3s ease-in-out',
    zIndex: 99,
    overscrollBehavior: 'contain',
}));

const RightContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    '& > button > svg': {
        fontSize: '30px',
        fill: theme.palette.ecommerce.pink,
        padding: '1px',
    },
    '& > button > span > svg': {
        fontSize: '30px',
        fill: theme.palette.ecommerce.pink,
        padding: '1px',
    },
    '& > button': {
        '&:hover': {
            backgroundColor: 'transparent',
            '& > span > svg': {
                fill: theme.palette.ecommerce.swatch_2
            },
            '& > svg': {
                fill: theme.palette.ecommerce.swatch_2
            }
        }
    }
}));

//----------------------------------------------------------------

export default function TopBar() {
    const navigate = useNavigate();
    const {scrollTop, screen} = useSelector(slice => slice.generalState);
    const {user} = useSelector(slice => slice.user);
    //burger
    const [openBurger, setOpenBurger] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpenBurger(false));
    //menu
    const profileAnchorRef = useRef(null);
    const [openMenu, setOpenMenu] = useState(null);
    const handleClick = (event) => setOpenMenu(event.currentTarget);
    const handleClose = () => {setOpenMenu(null)};

    const PROFILEMENU = [{
        id: 1,
        text: user.dummy ? 'Sign In' : user.email,
        listItemIcon: false,
        functionality: {
            onClick: () => {
                navigate(user.dummy ? '/login' : '/profile/myProfile', {state: 1})
            }
        }
    }, {
        id: 2,
        icon: <Divider/>,
        text: 'divider',
        listItemIcon: false
    }, {
        id: 3,
        text: 'Profile',
        listItemIcon: true,
        functionality: {
            onClick: () => navigate(user.dummy ? '/login' : '/profile/myProfile', {state: 1})
        }
    }, {
        id: 4,
        text: 'Orders',
        listItemIcon: true,
        functionality: {
            onClick: () => navigate(user.dummy ? '/login' : '/profile/myOrder', {state: 2})
        }
    }, {
        id: 5,
        text: 'Wishlist',
        listItemIcon: true,
        functionality: {
            onClick: () => navigate(user.dummy ? '/login' : '/profile/wishlist', {state: 3})
        }
    }, {
        id: 6,
        text: 'Policy',
        listItemIcon: true,
        functionality: {
            onClick: () => navigate(user.dummy ? '/login' : '/profile/policy', {state: 4})
        }
    }, {
        id: 7,
        icon: <Divider/>,
        text: 'divider',
        listItemIcon: false
    }, {
        id: 8,
        text: 'Sign Out',
        listItemIcon: true,
        functionality: {
            onClick: () => {
                import('../../helper/FirebaseAuthService').then(module => {
                    module.logoutUser().then(_ => {
                        for (const [key] of Object.entries(window.localStorage)) {
                            if(key) {
                                window.localStorage.removeItem(key)
                            }
                        }
                    }).then(_ => navigate('/login'))
                    .then(_ => window.location.reload())
                })

            }
        }
    }]

    let PROFILEMENUFILTERED = !user.dummy ? PROFILEMENU : PROFILEMENU.filter((item, index) => index < 5);

    const RIGHTCONTAINERITEMS = [{
        id: 1,
        tooltip: 'Profile',
        badgeValue: false,
        visibleOnMobile: 1,
        icon: <PersonOutlineOutlinedIcon/>,
        ref: profileAnchorRef,
        functionality: {
            onClick: (e) => handleClick(e)
        }
    }, {
        id: 2,
        tooltip: 'Search',
        visibleOnMobile: 0,
        badgeValue: false,
        icon: <SearchOutlinedIcon/>,
        navigateTo: ''

    }, {
        id: 3,
        tooltip: 'Wishlist',
        badgeValue: user?.wish_list?.length || '',
        visibleOnMobile: 0,
        icon: <FavoriteBorderOutlinedIcon/>,
        navigateTo: '',
        functionality: {
            onClick: (e) => user.dummy ?
                window.confirm({t: 'info', c: `Sign in first to manage your 'Wishlist'`})
                    .then(res => {
                        if (res) {
                            window.dispatch(generalSliceActions.setModal({open: true, who: 'login'}))
                        }
                    }):
                navigate('/profile/wishlist', {state: 3})
        }
    }, {
        id: 4,
        tooltip: 'Cart',
        visibleOnMobile: 1,
        badgeValue: user?.cart?.item?.reduce((acc, curr) => { return acc + curr.quantity}, 0) || '',
        icon: <LocalMallOutlinedIcon/>,
        functionality: {
            onClick: () => {navigate('/cart')}
        }
    }]

    return (
        <RootStyle scrolltop={scrollTop}>
            {screen >= 786 && <BannerSection/>}
            <Header>
                <Overlay sx={{
                    backdropFilter: openBurger ? 'blur(1px)' : '',
                    left: openBurger ? 0 : ''
                }}/>
                <Stack ref={node}>
                    <Burger open={openBurger} setOpen={setOpenBurger} screen={screen}/>
                    <Menu open={openBurger} setOpen={setOpenBurger}/>
                </Stack>
                <Stack sx={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                    <Stack sx={{width: {lg: '180px', xs: '130px'}, height: {lg: '60px', xs: '40px'}, justifyContent: 'center'}}>
                        <img src={Logo} alt='logo' style={{filter: 'saturate(2.5)', width: '100%', height: '100%'}}/>
                    </Stack>
                </Stack>
                <RightContainer>
                    {RIGHTCONTAINERITEMS.map(item =>
                        <EzSetOfIcons
                            key={item.id}
                            tooltip={item.tooltip}
                            badgeValue={item.badgeValue}
                            icon={item.icon}
                            navigateTo={item.navigateTo}
                            functionality={item.functionality}
                            refComponent={item.ref}
                            visibleOnMobile={item.visibleOnMobile}
                        />
                    )}
                </RightContainer>
                <EzMenu
                    open={Boolean(openMenu)}
                    anchorEl={openMenu}
                    onClose={handleClose}
                    onClick={handleClose}
                    data={PROFILEMENUFILTERED}/>
            </Header>
        </RootStyle>
    );
}
