import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
// material
import {Box, IconButton, InputAdornment} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
//firebase
import FirebaseAuthService from "../../helper/FirebaseAuthService";
//
import LoginWrapper from './LoginWrapper';
import {createAccountProcess, loginProcess} from "../../helper/Helper";
import {getUser} from "../../helper/FirestoreApi";
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import EzTextField from "../../components/ezComponents/EzTextField/EzTextField";
import EzButton from "../../components/ezComponents/EzButton/EzButton";
import EzText from "../../components/ezComponents/EzText/EzText";
import {generalSliceActions} from "../../store/gs-manager-slice";

//----------------------------------------------------------------

export default function CreateAccount({ modal}) {
    const navigate = useNavigate();
    const location = useLocation();
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
            return window.displayNotification({
                t: 'warning',
                c: `Password doesn't match, double check Caps Lock`
            })
        } else if (password.length < 6) {
            return window.displayNotification({
                t: 'warning',
                c: `Password has to be at least 6 characters`
            })
        } else {
            setLoading(true)
            try {
                const user = await FirebaseAuthService.registerUser(email, password);
                if(user) {
                    createAccountProcess(user).then();
                    setLoading(false)
                    window.confirm({t: 'info', c: `Account Created Successfully want to 'Sign In Directly?'`})
                        .then(async (res) => {
                            if(res) {
                                try {
                                    const firebaseUser = await FirebaseAuthService.loginUser(email, password);
                                    const dbUser = await getUser(firebaseUser.uid);
                                    loginProcess({firebaseUser, dbUser, modal, navigate, location, setLoading}).then();
                                } catch (err) {
                                    alert(`Login Error ${err.message}`);
                                    setLoading(false)
                                }
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
                            return window.dispatch(generalSliceActions.setModal({open: true, who: 'login'}))
                        }
                        navigate('/login')
                    }}
                >Cancel</EzButton>
            </Box>
        </LoginWrapper>
    );
}
