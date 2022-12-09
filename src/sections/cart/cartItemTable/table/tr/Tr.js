import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {userSliceActions} from "../../../../../store/userSlice";
// material
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
//
import Cell from "../cell/Cell";
import EzColorPicker from "../../../../../components/ezComponents/EzColorPicker/EzColorPicker";
import EzFormatPrice from "../../../../../components/ezComponents/EzFormatPrice/EzFormatPrice";
import EzCustomIconButton from "../../../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";

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
}));

const ImageContainer = styled(Stack)(({theme}) => ({
    width: '100px',
    padding: '10px 5px',
    '&:hover': {
        cursor: 'pointer'
    },
    [theme.breakpoints.down('sm')]: {
        width: '90px'
    }
}))

//----------------------------------------------------------------

export default function Tr({name, color, size, image, price, quantity, variation_id, product_id}) {
    const navigate = useNavigate();
    const {user} = useSelector(slice => slice.user);
    const {product} = useSelector(slice => slice.shop);
    const productToFullView = product.filter(item => item.id === product_id);
    const [quantityS, setQuantityS] = useState(0);
    useEffect(_ => {setQuantityS(quantity)}, [quantity]);

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'minmax(100px, 1.5fr) 1fr .3fr .4fr',
                    md: 'minmax(100px, 1.5fr) 1fr 1fr .5fr'
                },
                '*': {
                    fontWeight: 700,
                }
            }}
        >
            <Cell>
                <Stack flexDirection='row' gap='5px'>
                    <ImageContainer onClick={_ => navigate(`/full-detail/${product_id}`, {state: productToFullView[0]})}>
                        <img src={image} alt="product image"/>
                    </ImageContainer>
                    <Stack
                        sx={{
                            alignItems: {xs: 'flex-start', md: 'center'},
                            justifyContent: 'center',
                            flex: 1,
                            gap: {xs: 0, md: '5px'},
                            p: '10px 0',
                            '& > span': {
                                fontSize: '11px'
                            }
                        }}
                    >
                        <Typography variant='span' sx={{fontSize: {md: '14px !important'}}}>Name: Bikini</Typography>
                        <Stack flexDirection='row' alignItems='center'>
                            Color:
                            <EzColorPicker
                                key={color}
                                backgroundColor={color}
                                height={'12px'}
                                width={'12px'}
                            />
                        </Stack>
                        <Typography variant='span' sx={{textAlign: 'left'}}>
                            Size: '{
                                size === 1 ? 'XS' :
                                size === 2 ? 'S' :
                                size === 3 ? 'M' :
                                size === 4 ? 'L' :
                                size === 5 ? 'XL' : ''
                            }'
                        </Typography>
                        <Typography
                            variant='span'
                            sx={{
                                gap: '5px',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant='span'>Price:</Typography>
                            <EzFormatPrice
                                price={price}
                            />
                        </Typography>
                    </Stack>
                </Stack>
            </Cell>
            <Cell>
                <Stack flexDirection='row' justifyContent='center' gap='5px'>
                    <Button
                        onClick={_ =>
                            window.dispatch(userSliceActions.decreaseQty({
                                variation_id: variation_id,
                                quantity: quantity, user
                            }))
                        }
                        sx={{
                            color: theme => theme.palette.ecommerce.pink_3,
                            minWidth: '10px'
                        }}
                    >-</Button>
                    <TextField
                        type='number'
                        disabled
                        variant="standard"
                        value={quantityS}
                        onChange={e => setQuantityS(e.target.value)}
                        sx={{
                            width: '30px',
                            '& input': {
                                color: theme => theme.palette.ecommerce.pink_3,
                                textAlign: 'center',
                            }
                        }}
                    />
                    <Button
                        disabled={quantity === 99}
                        onClick={_ =>
                            window.dispatch(userSliceActions.increaseQty({
                                variation_id: variation_id, user
                            }))
                        }
                        sx={{
                            color: theme => theme.palette.ecommerce.pink_3,
                            minWidth: '10px'
                        }}
                    >+</Button>
                </Stack>
            </Cell>
            <Cell>
                <EzFormatPrice price={price * quantity}/>
            </Cell>
            <Cell>
                <ActionContainer>
                    <EzCustomIconButton
                        toolTipTitle='Delete'
                        ariaLabel='delete'
                        icon={<DeleteOutlinedIcon/>}
                        sx={{p: 0}}
                        onClick={_ => {
                            window.confirm({type: 'info', title: 'Confirm', content: `Your are about to delete '${name}'`})
                                .then(res => {
                                    if(res) {
                                        window.dispatch(userSliceActions.removeFromCart({
                                            variation_id, user
                                        }));
                                        window.displayNotification({
                                            type: 'success',
                                            content: 'Product Deleted Successfully'
                                        })
                                    }
                                })
                        }}
                    />
                </ActionContainer>
            </Cell>
        </Box>
    )
}
