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
import EzPriceFormat from "../../../../../components/ezComponents/EzPriceFormat/EzPriceFormat";
import EzCustomIconButton from "../../../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
import EzCheckBox from "../../../../../components/ezComponents/EzCheckBox/EzCheckBox";
import EzText from "../../../../../components/ezComponents/EzText/EzText";

//----------------------------------------------------------------
const TrContainer = styled(Stack)(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(100px, 2fr) 4fr',
    borderBottom: '1px solid #e9e9e9',
    [theme.breakpoints.up(550)]: {
        gridTemplateColumns: 'minmax(100px, 2fr) 2fr',
    },
    [theme.breakpoints.down(550)]: {
        gridTemplateColumns: 'minmax(100px, 4fr) 1fr',
    }
}));

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
    minWidth: '80px',
    padding: '10px 5px',
    '&:hover': {
        cursor: 'pointer'
    },
    [theme.breakpoints.down('sm')]: {
        width: '90px'
    }
}));

const CustomCell = styled(Stack)(({theme}) => ({
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '70px',
    [theme.breakpoints.up(1250)]: {
        gap: '150px',
    },
    [theme.breakpoints.between(1000, 1250)]: {
        gap: '100px',
    },
    [theme.breakpoints.between(550, 1000)]: {
        gap: '30px',
    },
    [theme.breakpoints.down(550)]: {
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'center',
        gap: '10px',
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '1px',
            height: '80px',
            backgroundColor: 'rgba(153,153,153,0.33)',
            left: '-4px'
        }
    }
}))

const QuantityContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '5px',
}));

const LastContainer = styled(Stack)(({theme}) => ({
    flexDirection:'row',
    gap:'70px',
    justifyContent:'center',
    [theme.breakpoints.up(1250)]: {
        gap: '150px',
    },
    [theme.breakpoints.between(1000, 1250)]: {
        gap: '100px',
    },
    [theme.breakpoints.between(550, 1000)]: {
        gap:'30px',
    },
    [theme.breakpoints.down(550)]: {
        gap:'10px',
    }
}))
//----------------------------------------------------------------

export default function Tr({name, color, size, image, price, quantity, variation_id, product_id, checked}) {
    const navigate = useNavigate();
    const {user} = useSelector(slice => slice.user);
    const {product} = useSelector(slice => slice.shop);
    const productToFullView = product.filter(item => item.id === product_id);
    const [quantityS, setQuantityS] = useState(0);
    useEffect(_ => {setQuantityS(quantity)}, [quantity]);

    return (
        <TrContainer>
            <Cell>
                <Stack flexDirection='row' gap='2px'>
                    <Stack justifyContent='center' sx={{'& > span': {padding: 0}}}>
                        <EzCheckBox
                            checked={checked}
                            size='small'
                            onChange={_ => window.dispatch(userSliceActions.toggleCheck({variation_id, user}))}
                        />
                    </Stack>
                    <ImageContainer onClick={_ => navigate(`/full-detail/${product_id}`, {state: productToFullView[0]})}>
                        <img src={image} alt="product image"/>
                    </ImageContainer>
                    <Stack
                        sx={{
                            alignItems: {xs: 'flex-start', md: 'center'},
                            justifyContent: 'center',
                            flex: 1,
                            gap: {xs: 0, md: '5px'},
                            p: '10px 0'
                        }}
                    >
                        <EzText text={`Name: ${name}`}/>
                        <Stack flexDirection='row' alignItems='center'>
                            <EzText text='Color :'/>
                            <EzColorPicker
                                key={color}
                                backgroundColor={color}
                                height={'12px'}
                                width={'12px'}
                            />
                        </Stack>
                        <EzText text={`Size: ${size}`}/>
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
                            <EzText text='Price :'/>
                            <EzPriceFormat
                                price={price}
                            />
                        </Typography>
                    </Stack>
                </Stack>
            </Cell>
            <CustomCell>
                <QuantityContainer>
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
                </QuantityContainer>
                <LastContainer>
                    <EzPriceFormat price={price * quantity}/>
                    <ActionContainer>
                        <EzCustomIconButton
                            toolTipTitle='Delete'
                            ariaLabel='delete'
                            icon={<DeleteOutlinedIcon/>}
                            sx={{p: 0}}
                            onClick={_ => {
                                window.confirm({t: 'info', title: 'Confirm', c: `Your are about to delete '${name}'`})
                                    .then(res => {
                                        if(res) {
                                            window.dispatch(userSliceActions.removeFromCart({
                                                variation_id, user
                                            }));
                                            window.displayNotification({
                                                t: 'success',
                                                c: 'Product Deleted Successfully'
                                            })
                                        }
                                    })
                            }}
                        />
                    </ActionContainer>
                </LastContainer>
            </CustomCell>
        </TrContainer>
    )
}
