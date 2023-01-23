import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {generalSliceActions} from "../../store/gs-manager-slice";
// material
import {Box, IconButton, InputAdornment, Stack} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
//
import LoginWrapper from './LoginWrapper';
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import EzButton from "../../components/ezComponents/EzButton/EzButton";
import EzTextField from "../../components/ezComponents/EzTextField/EzTextField";
import EzText from "../../components/ezComponents/EzText/EzText";
import {btnOutlined} from "../../helper/Style";

//dynamic import

//----------------------------------------------------------------
export default function Login({modal}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleBtnLoading, setGoogleBtnLoading] = useState(false);

    const onLoginWithGoogle = async () => {
        setGoogleBtnLoading(true);
        try {
            const googleUser = await import('../../helper/FirebaseAuthService').then(module => {
                return module.loginWithGoogle()
            });
            const dbUser = await import('../../helper/FirestoreApi').then(module => {
                return module.getUser(googleUser.user.uid)
            });
            if(!dbUser) {
                const res = await import('../../helper/Helper').then(module => {
                    return module.createAccountProcess(googleUser.user)
                });
                if(res === 'created') {
                    const dbCurrentUser = await import('../../helper/FirestoreApi').then(module => {
                        return module.getUser(googleUser.user.uid)
                    });
                    import('../../helper/Helper').then(module => {
                        module.loginProcess({
                            token: googleUser.user.accessToken,
                            dbUser: dbCurrentUser,
                            modal,
                            navigate,
                            location,
                            setLoading
                        }).then();
                    });

                }
            }
            import('../../helper/Helper').then(module => {
                module.loginProcess({
                    token: googleUser.user.accessToken,
                    dbUser,
                    modal,
                    navigate,
                    location,
                    setLoading
                }).then();
            });
        } catch (err) {
            if(err.code === 'auth/popup-closed-by-user') {
                setGoogleBtnLoading(false)
            } else {
                window.displayNotification({
                    t: 'error',
                    c: 'There is some error with you Google Account'
                })
            }
        }
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email'),
            password = data.get('password');
        setLoading(true);
        const firebaseUser = await import('../../helper/FirebaseAuthService').then(module => {
            return module.loginUser(email, password)
        });
        if(firebaseUser) {
            const dbUser = await import('../../helper/FirestoreApi').then(module => {
                return module.getUser(firebaseUser.uid)
            });
            import('../../helper/Helper').then(module => {
                module.loginProcess({
                    token: firebaseUser.accessToken,
                    dbUser,
                    modal,
                    navigate,
                    location,
                    setLoading
                }).then()
            });
        }
        setLoading(false);
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
                <EzLoadingBtn
                    onClick={onLoginWithGoogle}
                    startIcon={<GoogleIcon/>}
                    fullWidth
                    size='large'
                    variant='outlined'
                    loading={googleBtnLoading}
                >
                    Sign in with Google
                </EzLoadingBtn>
                <Stack flexDirection='row' gap='5px' justifyContent='space-between'>
                    {!modal && <EzButton
                        sx={{...btnOutlined}}
                        variant='outlined'
                        onClick={() => navigate('/forgot-password')}
                    >
                        Forgot
                    </EzButton>}
                    <EzButton
                        sx={{...btnOutlined}}
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
