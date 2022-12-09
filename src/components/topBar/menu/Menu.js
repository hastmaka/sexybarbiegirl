import {generateLink} from '../../../utils';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';
// material
import {Stack} from '@mui/material';
//
// import logo from '../../../resources/Final Files/Special Gifts For You/App Icons & Favicons/SVG/Asset 55.svg';

//---------------------------------------------------------------------

const LINKS = [{
    link_id: 1,
    link_name: 'Home',
    link_to: '/'
}, {
    link_id: 2,
    link_name: 'Shop',
    link_to: '/shop'
}, {
    link_id: 3,
    link_name: 'About-us',
    link_to: 'about-us'
}]


const Menu = ({open}) => {
    const location = useLocation().pathname.split('/');
    const [selectedTo, setSelectedTo] = useState(location[location.length - 1]);
    const handleMenuItemClick = index => {setSelectedTo(index)};
    const [openn, setOpenn] = useState(true);
    const handleClick = () => {setOpenn(!openn)};
    return (
        <Stack
            sx={{
                justifyContent: 'center',
                backgroundColor: theme => theme.palette.ecommerce.pink_1,
                // backgroundImage: `url(${logo})`,
                width: '300px', height: '100vh',
                padding: '2rem',
                position: 'absolute',
                top: 0, left: 0,
                transform: open ? 'translateX(0)' : 'translateX(-300px)',
                transition: 'transform 0.3s ease-in-out',
                zIndex: 100,

            }}>
            {generateLink(LINKS, null, null, selectedTo, handleClick, handleMenuItemClick, openn)}
        </Stack>
    )
}

export default Menu;