// material
import {Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Outlet, useNavigate} from 'react-router-dom';
//
import TopBar from '../components/topBar/TopBar';
import {useSelector} from "react-redux";
import Footer from "../sections/footer/Footer";
import {useIsScroll, useScrollTop} from "../helper/Hooks";
import {useEffect} from "react";
import {MobileNavigation} from "./MobileNavigation";
import EzCustomIconButton from "../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
import {generalSliceActions} from "../store/gs-manager-slice";
import TopBarMobile from "../components/topBar/TopBarMobile";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    position: 'relative',
    minHeight: '100vh'
}));

const OutletContainer = styled(Stack)(({theme}) => ({
    backgroundColor: theme.palette.ecommerce.bg_parent,
    flexGrow: 1,
    // minHeight: 'calc(100vh - 100px)'
}));

const StickyMobileMenu = styled(Stack)(({scrolltop, theme}) => ({
    // visibility: scrolltop === 0 ? 'hidden' : 'visible',
    // opacity: scrolltop === 0 ? 0 : 1,
    transition: 'all 500ms, opacity 0.3s linear',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    // height: scrolltop === 0 ? '50px' : '75px',
    height: '50px',
    borderTop: '1px solid lightgrey',
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 9999
}))

const IconContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-around'
}));

//----------------------------------------------------------------

export default function Layout() {
    const {screen, scrollTop} = useSelector(slice => slice.generalState);
    const {user, userStatus} = useSelector(store => store.user);
    const navigate = useNavigate();

    return (
        <RootStyle>
            {/*{userStatus.loaded && screen <= 786 ? <TopBarMobile/> : <TopBar/>}*/}
            {userStatus.loaded && <TopBar/>}

            <OutletContainer>
                <Outlet/>
            </OutletContainer>

            <Footer/>
            {/*{screen <= 786 &&*/}
            {/*    <StickyMobileMenu scrolltop={scrollTop}>*/}
            {/*        <IconContainer>*/}
            {/*            {MobileNavigation.map(item =>*/}
            {/*                <EzCustomIconButton*/}
            {/*                    onClick={_ => {*/}
            {/*                        let path =*/}
            {/*                            item.to === '/' ? {p: '/'} :*/}
            {/*                            item.to === '/profile/wishlist' ? {p: '/profile/wishlist', s: 3} :*/}
            {/*                            item.to === '/profile/myProfile' ? {p: '/profile/wishlist', s: 1} :*/}
            {/*                            item.to === '/cart' ? {p: 'cart'} :*/}
            {/*                                ''*/}
            {/*                        user.dummy ?*/}
            {/*                            window.confirm({t: 'info', c: `Sign in first to manage your 'Wishlist'`})*/}
            {/*                                .then(res => {*/}
            {/*                                    if (res) {*/}
            {/*                                        window.dispatch(generalSliceActions.setModal({*/}
            {/*                                            open: true,*/}
            {/*                                            who: 'login'*/}
            {/*                                        }))*/}
            {/*                                    }*/}
            {/*                                }) :*/}
            {/*                            navigate(path.p, {state: path.s})*/}
            {/*                    }}*/}
            {/*                    key={item.id}*/}
            {/*                    icon={item.icon}*/}
            {/*                />*/}
            {/*            )}*/}
            {/*        </IconContainer>*/}
            {/*    </StickyMobileMenu>*/}
            {/*}*/}
        </RootStyle>
    );
}
