import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {generalSliceActions} from "../../store/gs-manager-slice";
import {userSliceActions} from "../../store/userSlice";
// material
import {Box, IconButton, InputAdornment, Stack, Typography} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
//firebase
import {doc, getDoc} from "firebase/firestore";
import FirebaseAuthService from "../../helper/FirebaseAuthService";
import {db} from "../../helper/FirebaseConfig";
//
import LoginWrapper from './LoginWrapper';
import {mergeTwoCart, updateCart} from "../../helper/Helper";
import {updateCartApi} from "../../helper/FirestoreApi";
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import EzButton from "../../components/ezComponents/EzButton/EzButton";
import EzTextField from "../../components/ezComponents/EzTextField/EzTextField";
import EzText from "../../components/ezComponents/EzText/EzText";

//----------------------------------------------------------------
const btnStyle = {
    color: theme => theme.palette.ecommerce.pink,
    border: `1px solid ${'#f438de'}`,
    '&:hover': {
        color: theme => theme.palette.ecommerce.swatch_8,
        border: `1px solid ${'#fff'}`,
        backgroundColor: theme => theme.palette.ecommerce.pink,
    }
}
export default function Login({modal}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email'),
            password = data.get('password');
        setLoading(true);
        try {
            const user = await FirebaseAuthService.loginUser(email, password);
            if(user) {
                const data = await getDoc(doc(db, 'users', user.uid));
                if(!data.data().dummy) {
                    const {cart, ...rest} = data.data();
                    const tempCart = JSON.parse(localStorage.getItem('user')).cart;
                    if (tempCart.item.length > 0) {
                        cart.item = cart.item.length > 0 ? mergeTwoCart([...tempCart.item, ...cart.item]) : [...tempCart.item];
                        const cartUpdated = updateCart(cart);
                        updateCartApi(user.uid, cartUpdated);
                        window.dispatch(userSliceActions.setUser({...rest, cart: {...cartUpdated}}));
                        if(modal) {
                            window.dispatch(generalSliceActions.setModal({open: false, who: ''}))
                        }
                        navigate(location.pathname === '/checkout' ? '/checkout' : '/')
                        setLoading(false);
                    } else {
                        if(modal) {
                            window.dispatch(generalSliceActions.setModal({open: false, who: ''}))
                        }
                        window.dispatch(userSliceActions.setUser(data.data()))
                        navigate('/');
                        setLoading(false)
                    }
                }
            } else {
                setLoading(false)
            }
        } catch (err) {
            alert(`Login Error ${err.message}`);
            setLoading(false)
        }
    }

    return (
        <LoginWrapper>
            <EzText text='Sign in' variant='h4' sx={{textAlign: 'center', margin: '0 20px 20px 20px', fontSize: '1.5rem'}}/>
            <Box component='form' onSubmit={onLoginSubmit}>
                <EzTextField
                    required
                    autoFocus
                    type='email'
                    name='email'
                    label='Email'
                />
                <EzTextField
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    sx={({palette}) => ({
                                        color: palette.ecommerce.pink
                                    })}
                                    edge='end'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <EzLoadingBtn
                    sx={{marginTop: '25px'}}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='outlined'
                    loading={loading}
                >
                    Sign in
                </EzLoadingBtn>
                <Stack flexDirection='row' gap='5px' justifyContent='space-between'>
                    {!modal && <EzButton
                        sx={{...btnStyle}}
                        variant='outlined'
                        onClick={() => navigate('/forgot-password')}
                    >
                        Forgot
                    </EzButton>}
                    <EzButton
                        sx={{...btnStyle}}
                        fullWidth={!!modal}
                        variant='outlined'
                        onClick={() => {
                            if(modal) {
                                return window.dispatch(generalSliceActions.setModal({open: true, who: 'create-account'}))
                            }
                            navigate('/create-account')
                        }}
                    >
                        Create
                    </EzButton>
                </Stack>
            </Box>
        </LoginWrapper>
    );
}
