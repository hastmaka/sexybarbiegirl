// material
import {Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Outlet} from 'react-router-dom';
//
import TopBar from '../components/topBar/TopBar';
import {useSelector} from "react-redux";
import Footer from "../sections/footer/Footer";
import {useIsScroll, useScrollTop} from "../helper/Hooks";
import {useEffect} from "react";

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
    // transition: 'visibility 500ms, opacity 0.3s linear',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: scrolltop === 0 ? '50px' : '75px',
    borderTop: '1px solid lightgrey',
    backgroundColor: 'rgba(255,255,255,0.29)'
}))

//----------------------------------------------------------------

export default function Layout() {
    const {screen, scrollTop} = useSelector(slice => slice.generalState);
    const {userStatus} = useSelector(store => store.user);

    return (
        <RootStyle>
            {userStatus.loaded && <TopBar/>}

            <OutletContainer>
                <Outlet/>
            </OutletContainer>

            <Footer/>
            {/*{screen <= 786 && <StickyMobileMenu scrolltop={scrollTop}>*/}
            {/*    floating mobile navigation*/}
            {/*</StickyMobileMenu>}*/}
        </RootStyle>
    );
}
