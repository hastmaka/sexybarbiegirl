import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMallIcon from '@mui/icons-material/LocalMall';

export const MobileNavigation = [{
    id: 1, icon: <HomeIcon/> , to: '/'
}, {
    id: 2, icon: <PersonIcon/> , to: '/profile/myProfile'
}, {
    id: 3, icon: <FavoriteIcon/> , to: '/profile/wishlist'
}, {
    id: 4, icon: <LocalMallIcon/> , to: '/cart'
}]