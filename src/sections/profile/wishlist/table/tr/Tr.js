import {useSelector} from "react-redux";
import {useState} from "react";
import {userSliceActions} from "../../../../../store/userSlice";
// material
import {Box, IconButton, Stack, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//
import Cell from "../cell/Cell";
import EzPriceFormat from "../../../../../components/ezComponents/EzPriceFormat/EzPriceFormat";
import EzModalWithTransition from "../../../../../components/ezComponents/EzModalWithTransition/EzModalWithTransition";
import EzProductDetails from "../../../../productDetail/EzProductDetails";

//----------------------------------------------------------------

const ActionContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    '& > button > svg': {
        fill: theme.palette.ecommerce.pink,
        padding: '1px',
    },
    '& > button > span > svg': {
        fill: theme.palette.ecommerce.pink,
        padding: '1px',
    },
    '& > button': {
        '&:hover': {
            backgroundColor: 'transparent',
            '& > span > svg': {
                fill: theme.palette.ecommerce.darkGold
            },
            '& > svg': {
                fill: theme.palette.ecommerce.darkGold
            }
        }
    }
}))

//----------------------------------------------------------------

export default function Tr({product}) {
    const {name, price, image} = product;
    const {user} = useSelector(slice => slice.user);
    //modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);


    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(100px, 1fr) 1fr .4fr',
                    '*': {
                        fontWeight: 700,
                        color: '#595959'
                    }
                }}
            >
                <Cell>
                    <Stack flexDirection='row' gap='5px'>
                        <Stack
                            sx={{
                                width: {
                                    xs: '90px',
                                    sm: '110px'},
                                padding: '10px 5px',
                            }}
                        >
                            <img src={image[0].url} alt="product image"/>
                        </Stack>
                        <Stack
                            sx={{
                                alignItems: {xs: 'flex-start', md: 'center'},
                                justifyContent: 'center',
                                textTransform: 'capitalize',
                                flex: 1,
                                gap: {xs: 0, md: '10px'},
                                p: '10px 0',
                                '& > span': {
                                    fontSize: '11px'
                                }
                            }}
                        >
                            {name}
                        </Stack>
                    </Stack>
                </Cell>
                <Cell>
                    <EzPriceFormat price={price}/>
                </Cell>
                <Cell>
                    <ActionContainer>
                        <Tooltip title='Add to Cart' arrow placement='bottom'>
                            <IconButton
                                onClick={_ => setOpen(true)}
                                aria-label="add_to_cart" sx={{p: 0}}>
                                <AddShoppingCartIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete' arrow placement='bottom'>
                            <IconButton
                                onClick={_ => {
                                    window.confirm({t: 'info', c: `Sure you want to remove this 'Product from your WishList?'`})
                                        .then(res => {
                                            if(res) {
                                                window.dispatch(userSliceActions.removeFromWishlist({product, user}));
                                                window.displayNotification({
                                                    t: 'info',
                                                    c: 'Item remove from Wishlist successfully'
                                                })
                                            }
                                        })
                                }}
                                aria-label="update" sx={{p: 0}}>
                                <DeleteOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                    </ActionContainer>
                </Cell>
            </Box>
        </>
    )
}
