import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {generalSliceActions} from "../../store/gs-manager-slice";
import {userSliceActions} from "../../store/userSlice";
// material
import {Box, IconButton, InputAdornment, Stack} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
//firebase
import FirebaseAuthService from "../../helper/FirebaseAuthService";
//
import LoginWrapper from './LoginWrapper';
import {loginProcess} from "../../helper/Helper";
import {getUser} from "../../helper/FirestoreApi";
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
            const firebaseUser = await FirebaseAuthService.loginUser(email, password);
            const dbUser = await getUser(firebaseUser.uid);
            loginProcess({firebaseUser, dbUser, modal, navigate, location, setLoading}).then();
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
