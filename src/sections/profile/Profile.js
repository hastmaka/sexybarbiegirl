import {useSelector} from "react-redux";
import {useIsScroll, useLocalStorage} from "../../helper/Hooks";
import {useLocation} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
//material
import {Box, Stack, Tab, Tabs} from '@mui/material';
import {styled} from "@mui/material/styles";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TocIcon from "@mui/icons-material/Toc";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
//
// import MyOrder from "./myOrder/MyOrder";
// import WishList from "./wishlist/WishList";
// import MyProfile from "./myProfile/MyProfile";

//dynamic import
const MyOrders = lazy(() => import('./myOrder/MyOrder'));
const WishList = lazy(() => import('./wishlist/WishList'));
const MyProfile = lazy(() => import('./myProfile/MyProfile'));

//--------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    alignItems: 'center',
    backgroundColor: theme.palette.grey[300],
    [theme.breakpoints.down(786)]: {
        // padding: '5px 0 5px 0'
    },
    [theme.breakpoints.up(786)]: {
        // padding: '10px'
    }
}));

const ProfileContainer = styled(Stack)(({theme}) => ({
    maxWidth: '1432px',
    width: '100%',
    flexDirection: 'row',
    minHeight: 'calc(100vh - 130px)',
    [theme.breakpoints.down(786)]: {
        minHeight: 'calc(100vh - 95px)'
    }
}));

const ProfileContainerFix = styled(Box)(({theme}) => ({
    display: 'flex',
    flexGrow: 1,
    gap: '10px',
    [theme.breakpoints.down(786)]: {
        gap: 0
    }
}));

const StickySide = styled(Stack)(({theme}) => ({
    height: 'calc(100% - 10px)',
    backgroundColor: '#fff',
    borderRadius: '0 4px 4px 0',
    margin: '5px 0 5px 0',
    [theme.breakpoints.up(786)]: {
        height: 'calc(100% - 20px)',
        borderRadius: '4px',
        margin: '10px 0 10px 0',
    }
}));

const TabContainer = styled(Stack)(({theme}) => ({
    backgroundColor: theme.palette.grey[300],
    width: '100%',
    margin: '5px 0 5px 0',
    [theme.breakpoints.up(786)]: {
        margin: '10px 0 10px 0',
    }
}));

const Parent = styled(Stack)(({theme}) => ({
    // margin: '0 0 0 10px'
}));

const Child = styled(Stack)(({theme}) => ({
    // padding: '0 0 8px 8px',
    minHeight: 'calc(100vh - 130px)',
    [theme.breakpoints.down(786)]: {
        minHeight: 'calc(100vh - 86px)',
        padding: '0 0 0 4px'
    }
}));

//--------------------------------------------------------------

const tabMobile = [{
    id: 0, icon: <ManageAccountsIcon/>
}, {
    id: 1, icon: <TocIcon/>
}, {
    id: 2, icon: <FavoriteIcon/>
}, {
    id: 3, icon: <LocalPoliceIcon/>
}];

const tabDesktop = [{
    id: 0, label: "My Profile", icon: <ManageAccountsIcon/>
}, {
    id: 1, label: "My Orders", icon: <TocIcon/>
}, {
    id: 2, label: "My Wishlist", icon: <FavoriteIcon/>
}, {
    id: 3, label: "Policy", icon: <LocalPoliceIcon/>
}];

export default function Profile() {
    const location = useLocation();
    const {screen} = useSelector(slice => slice.generalState);
    const [tabIndex, setTabIndex] = useLocalStorage('profile', 0);
    //update scroll position
    useIsScroll();

    // debugger

    useEffect(_ => {
        //check if the page was reloaded
        if (location.state !== null) {
            setTabIndex(location.state - 1)
        }
    }, [location.state])

    return (
        <RootStyle>
            <ProfileContainer>
                <ProfileContainerFix>
                    <StickySide>
                        <Tabs
                            value={tabIndex}
                            onChange={(e, newTabIndex) => setTabIndex(newTabIndex)}
                            orientation="vertical"
                            sx={({palette}) => ({
                                borderRadius: screen <= 786 ? '0 4px 4px 0' : '4px',
                                // backgroundColor: '#fff',
                                maxWidth: screen <= 786 ? '40px' : '160px',
                                minWidth: screen <= 786 ? '40px' : '160px',
                                position: 'sticky',
                                top: screen <= 786 ? '80px' : '120px',
                                '& .MuiTabs-indicator': {
                                    display: screen <= 786 ? 'none' : '',
                                    backgroundColor: palette.ecommerce.swatch_2,
                                    width: '3px'
                                },
                                '& .MuiTab-root': {
                                    display: screen <= 786 ? '' : 'flex',
                                    flexDirection: screen <= 786 ? '' : 'row',
                                    gap: screen <= 786 ? '' : '5px',
                                    justifyContent: screen <= 786 ? '' : 'flex-start',
                                    minHeight: '48px'
                                },
                                '& .Mui-selected': {
                                    color: `${palette.ecommerce.swatch_4} !important`,
                                    backgroundColor: palette.ecommerce.pink
                                },
                                '& .MuiButtonBase-root': {
                                    fontSize: '12px'
                                },
                                '& button': {
                                    minWidth: 0
                                }
                            })}
                        >
                            {screen <= 786 && tabMobile.map(tab =>
                                <Tab key={tab.id} icon={tab.icon}/>
                            )}
                            {screen >= 786 && tabDesktop.map(tab =>
                                <Tab key={tab.id} icon={tab.icon} label={tab.label} sx={{marginBottom: '3px'}}/>//fix align label and icon
                            )}
                        </Tabs>
                    </StickySide>
                    <TabContainer>
                        <Parent>
                            {tabIndex === 0 ? (
                                <Child>
                                    <Suspense fallback={<div>Loading my profile</div>}><MyProfile/></Suspense>
                                </Child>
                            ) :
                            tabIndex === 1 ? (
                                <Child>
                                    <Suspense fallback={<div>Loading my orders</div>}><MyOrders/></Suspense>
                                </Child>
                            ) :
                            tabIndex === 2 ? (
                                <Child>
                                    <Suspense fallback={<div>Loading my wishlist</div>}><WishList/></Suspense>
                                </Child>
                            ) :
                            tabIndex === 3 ? (
                                <Child>
                                    Shipping Info - Return Policy - Privacy & Cookie Policy
                                </Child>
                            ) : ''}
                        </Parent>
                    </TabContainer>
                </ProfileContainerFix>
            </ProfileContainer>
        </RootStyle>
    );
}