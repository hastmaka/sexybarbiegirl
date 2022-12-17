import {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import LockIcon from "@mui/icons-material/Lock";
//
import {useIsScroll} from "../../helper/Hooks";
import EzHelpText from "../../components/ezComponents/EzHelpText/EzHelpText";
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import CartItemTable from "./cartItemTable/CartItemTable";
import CartSummary from "./cartSummary/CartSummary";
import EzProductWidget from '../../components/ezComponents/EzProductWidget/EzProductWidget';
import {calculateTotalFromCheckItems} from "../../helper/Helper";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    alignItems: 'center',
    padding: '0 10px 10px 10px',
    backgroundColor: theme.palette.grey[300]
}));

const CartContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    gap: '10px',
    maxWidth: '1432px',
    width: '100%',
    [theme.breakpoints.down(786)]: {
        flexDirection: 'column'
    }
}));

const ParentContainer = styled(Stack)(({theme}) => ({
    flex: 1,
    minHeight: 'calc(100vh - 130px)',
    [theme.breakpoints.down(786)]: {
        minHeight: '100%',
    }
}));

const StickyFix = styled(Stack)(({screen, theme}) => ({
    gap: '10px',
    position: 'sticky',
    top: '120px',
    [theme.breakpoints.down(786)]: {
        position: 'relative',
        top: 0,
    }
}));

const ChildContainer = styled(Stack)(() => ({
    gap: '20px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
}));

//-----------------------------------------------------------------------
export default function Cart() {
    const navigate = useNavigate();
    const {screen} = useSelector(slice => slice.generalState);
    const {user} = useSelector(slice => slice.user);
    const {product} = useSelector(slice => slice.shop);
    const {shippingOptionSelected} = useSelector(slice => slice.stripe);
    const [loading, setLoading] = useState(false);
    const totalFromCheckedItems = useMemo(() => {
        return !!user.cart.item.length ? calculateTotalFromCheckItems(user.cart.item) : 0
    }, [user.cart.item]);
    const total = (totalFromCheckedItems + totalFromCheckedItems * 0.07) + (shippingOptionSelected?.amount / 100 || 0);
    //get scroll from top for topbar shadow effect
    useIsScroll();

    return (
        <RootStyle>
            <Typography variant='span' sx={{fontWeight: 600, padding: '20px', fontSize: '20px'}}>Cart</Typography>
            <CartContainer screen={screen}>
                <CartItemTable user={user} screen={screen}/>
                <ParentContainer>
                    <StickyFix screen={screen}>
                        <CartSummary user={user} totalFromCheckedItems={totalFromCheckedItems} total={total}/>
                        <ChildContainer>
                            <EzLoadingBtn
                                sx={{
                                    marginTop: '25px',
                                    '&.Mui-disabled': {
                                        backgroundColor: 'transparent'
                                    }
                                }}
                                onClick={_ => navigate('/checkout')}
                                size='large'
                                type='submit'
                                variant='outlined'
                                loading={loading}
                                disabled={!user.cart.item.length}
                            >
                                { user.cart.item.length ?
                                    'Checkout' : 'Cart Empty'
                                }
                            </EzLoadingBtn>
                            <EzHelpText
                                alignment='center'
                                top='-16'
                            >
                                Secure payment powered by Stripe
                                <LockIcon
                                    sx={{fontSize: '11px', paddingLeft: '2px', top: '2px', position: 'absolute'}}/>
                            </EzHelpText>
                        </ChildContainer>
                        {/*recently visited*/}
                        <EzProductWidget productToRender={product} header='Recently Visited'/>
                    </StickyFix>
                </ParentContainer>
            </CartContainer>
        </RootStyle>
    );
}
