import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
// material
import {Box, IconButton, InputAdornment,Typography} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
//firebase
import {setDoc, doc, getDoc } from "firebase/firestore";
import {db} from "../../helper/FirebaseConfig";
import FirebaseAuthService from "../../helper/FirebaseAuthService";
//
import LoginWrapper from './LoginWrapper';
import {userSliceActions} from "../../store/userSlice";
import {mergeTwoCart, updateCart} from "../../helper/Helper";
import {updateCartApi} from "../../helper/FirestoreApi";
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import EzTextField from "../../components/ezComponents/EzTextField/EzTextField";
import EzButton from "../../components/ezComponents/EzButton/EzButton";
import EzText from "../../components/ezComponents/EzText/EzText";
import {generalSliceActions} from "../../store/gs-manager-slice";

//----------------------------------------------------------------

export default function CreateAccount({ modal, setWho}) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    // debugger

    const onCreateAccountSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email'),
            password = data.get('password'),
            confirmPassword = data.get('confirmPassword');
        if(password !== confirmPassword) {
            return window.displayNotification({type: 'warning', content: `Password doesn't match, double check Caps Lock`})
        } else if (password.length < 6) {
            return window.displayNotification({type: 'warning', content: `Password has to be at least 6 characters`})
        } else {
            setLoading(true)
            try {
                const user = await FirebaseAuthService.registerUser(email, password);
                if(user) {
                    const userTemp = JSON.parse(localStorage.getItem('user'))
                    userTemp.email = user.email;
                    userTemp.address = [];
                    userTemp.full_name = '';
                    userTemp.uid = user.uid;
                    userTemp.role = 2;
                    userTemp.dummy = false;
                    userTemp.cart = {
                        item: [],
                        create_at: Date.now(),
                        last_update: Date.now(),
                        quantity: 0,
                        sub_total: 0,
                        total: 0,
                        order_status: ''
                    }
                    userTemp.wish_list = []
                    await setDoc(doc(db, 'users', user.uid), userTemp);
                    setLoading(false)
                    window.confirm({type: 'info', content: `Account Created Successfully want to 'Sign In Directly?'`})
                        .then(async (res) => {
                            if(res) {
                                const user = await FirebaseAuthService.loginUser(email, password);
                                const data = await getDoc(doc(db, 'users', user.uid));
                                if(!data.data().dummy) {
                                    const {cart, ...rest} = data.data();
                                    const tempCart = JSON.parse(localStorage.getItem('user')).cart;
                                    if (tempCart.item.length > 0) {
                                        cart.item = cart.item.length > 0 ? mergeTwoCart([...tempCart.item, ...cart.item]) : [...tempCart.item];
                                        const cartUpdated = updateCart(cart);
                                        updateCartApi(user.uid, cartUpdated);
                                        window.dispatch(userSliceActions.setUser({...rest, cart: {...cartUpdated}}));
                                        navigate('/');
                                        setLoading(false);
                                    } else {
                                        window.dispatch(userSliceActions.setUser(data.data()))
                                        navigate('/');
                                        setLoading(false)
                                    }
                                }
                                setLoading(false);
                            } else {
                                navigate('/login')
                            }
                        })
                } else {
                    setLoading(false)
                }
            } catch (err) {
                debugger
                console.log(`Create Account Error ${err.message}`);
                setLoading(false)
            }
        }
    }

    return (
        <LoginWrapper>
            <EzText text='Sign up' variant='h4' sx={{textAlign: 'center', margin: '0 20px 20px 20px', fontSize: '1.5rem'}}/>
            <Box component='form' onSubmit={onCreateAccountSubmit}>
                <EzTextField required type='email' name='email' label='Email address' autoFocus/>
                <EzTextField
                    required
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    sx={{
                                        color: theme => theme.palette.ecommerce.pink
                                    }}
                                    edge='end'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <EzTextField
                    required
                    name='confirmPassword'
                    label='Confirm Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    sx={{
                                        color: theme => theme.palette.ecommerce.pink
                                    }}
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
                    Create
                </EzLoadingBtn>
                <EzButton
                    sx={{
                        padding: '8px 22px',
                        height: '48px'
                    }}
                    variant='outlined'
                    color='error'
                    onClick={() => {
                        if(modal) {
                            window.dispatch(generalSliceActions.setModal(true))
                            setWho('login')
                        }
                        navigate('/login')
                    }}
                >Cancel</EzButton>
            </Box>
        </LoginWrapper>
    );
}
