import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
// material
import {Box, IconButton, InputAdornment} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
//
import LoginWrapper from './LoginWrapper';
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import EzTextField from "../../components/ezComponents/EzTextField/EzTextField";
import EzButton from "../../components/ezComponents/EzButton/EzButton";
import EzText from "../../components/ezComponents/EzText/EzText";
import Login from "./Login";
import {openModal} from "../../helper/Helper";

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
            const user = await import('../../helper/FirebaseAuthService').then(module => {
                return module.registerUser(email, password)
            })
            if(user) {
                const dbUser = await import('../../helper/Helper').then(module => {
                    return module.createAccountProcess(user)
                });
                if(dbUser === 'created') {
                    setLoading(false)
                    window.confirm({t: 'info', c: `Account Created Successfully want to 'Sign In Directly?'`})
                        .then(async (res) => {
                            if(res) {
                                const dbCurrentUser = await import('../../helper/FirestoreApi').then(module => {
                                    return module.getUser(user.uid)
                                });
                                import('../../helper/Helper').then(module => {
                                    module.loginProcess({
                                        token: user.accessToken,
                                        dbUser: dbCurrentUser,
                                        modal,
                                        navigate,
                                        location,
                                        setLoading
                                    }).then()
                                });
                            } else {
                                navigate('/login')
                            }
                        })
                } else {
                    window.displayNotification({
                        t: 'info',
                        c: 'Error while creating the account'
                    })
                }
            } else {
                setLoading(false)
            }
        }
    }

    return (
        <LoginWrapper modal={modal}>
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
                            return openModal(<Login modal/>)
                        }
                        navigate('/login')
                    }}
                >Cancel</EzButton>
            </Box>
        </LoginWrapper>
    );
}
