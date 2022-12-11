import {useSelector} from "react-redux";
import {useIsScroll} from "../../helper/Hooks";
// material
import {Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import ShopOutlet from './shopOutlet/ShopOutlet';
import ShopSideBar from "./shopSideBar/ShopSideBar";

//---------------------------------------------------------------

const Breadcrumb = styled(Stack)({
    backgroundColor: '#f7f7f8'
});

const StoreContent = styled(Stack)({
    justifyContent: 'center',
    flexDirection: 'row'
});

const StoreFixContent = styled(Stack)(({theme}) => ({
    maxWidth: '1432px',
    width: '1432px',
    flexDirection: 'row',
    [theme.breakpoints.down(1432)]: {
        padding: '0 10px',
    },
    [theme.breakpoints.down(900)]: {
        padding: '0 5px',
    }
}));
//----------------------------------------------------------------

export default function Shop() {
    const {productState, filterState} = useSelector(slice => slice.shop);
    const {screen} = useSelector(slice => slice.generalState);

    //get scroll from top for topbar shadow effect
    useIsScroll();

    return (
        <>
            <Breadcrumb/>
            <Stack
                sx={({palette}) => ({
                    display: {xs: 'none', md: 'flex'},
                    minHeight: '80px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: palette.ecommerce.bg_parent
                })}><Typography variant='h4'>All Products</Typography>
            </Stack>
            {(productState.loaded && filterState.loaded) &&
                <StoreContent>
                    <StoreFixContent>
                        {screen >= 786 && <ShopSideBar/>}
                        <ShopOutlet/>
                    </StoreFixContent>
                </StoreContent>
            }
        </>
    );
}
