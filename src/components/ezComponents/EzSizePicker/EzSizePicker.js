// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({active, checked, theme}) => ({
    position: 'relative',
    marginTop: '10px',
    padding: '7px 17px',
    borderRadius: '35%',
    color: checked ? '#FFF' : theme.palette.ecommerce.swatch_3,
    backgroundColor: (checked && active === 'true') ? theme.palette.ecommerce.pink : 'rgba(153,153,153,0.34)',
    transition: 'all 200ms',
    pointerEvents: active === 'true' ? '' : 'none',
    '&:hover': {
        cursor: 'pointer',
        color: 'white',
        backgroundColor: checked ? theme.palette.ecommerce.pink : 'rgba(153,153,153,0.34)'
    }
}));

const OutOfStock = styled(Stack)(({theme}) => ({
    position: 'absolute',
    color: 'red',
    fontSize: '9px',
    whiteSpace: 'nowrap',
    left: '-1px',
    bottom: 0,
    fontWeight: 500
}));

//----------------------------------------------------------------

export default function EzSizePicker({stock, size, onClick, checked}) {
    return (
        <RootStyle
            active={(stock > 0).toString()}
            checked={checked}
            onClick={_ => onClick(size)}
        >
            {stock === 0 && <OutOfStock>out of stock</OutOfStock>}
            {size}
        </RootStyle>
    );
}
