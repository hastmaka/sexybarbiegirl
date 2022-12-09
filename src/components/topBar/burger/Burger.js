// material
import {Stack} from '@mui/material';
import {styled} from '@mui/material/styles';

//---------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    position: 'absolute',
    top: '60px',
    left: '15px',
    justifyContent: 'space-around',
    width: '2rem',
    height: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    zIndex: 101,
    [theme.breakpoints.down(786)]: {
        top: '27px'
    }
}));

const Bars = styled(Stack)(({theme}) => ({
    width: '28px',
    height: '2px',
    borderRadius: '5px',
    transition: 'all 0.3s linear',
    position: 'relative',
    transformOrigin: '1px',
    backgroundColor: theme.palette.ecommerce.pink,
    '&:hover': {
        backgroundColor: theme.palette.ecommerce.darkGold,
    }
}));

//--------------------------------------------------------

const Burger = ({open, setOpen}) => {
    return (
        <RootStyle onClick={() => setOpen(!open)}>
            <Bars sx={{ transform: open ? 'rotate(45deg)' : 'rotate(0)', width: open ? '28px' : '22px'}}/>
            <Bars sx={{ transform: open ? 'translateX(0)' : '', opacity: open ? 0 : 1}}/>
            <Bars sx={{ transform: open ? 'rotate(-45deg)' : 'rotate(0)'}}/>
        </RootStyle>
    )
}

export default Burger;



