import {useSelector} from "react-redux";
// material
import {Link, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Link as RouterLink} from "react-router-dom";
//

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({modal, theme}) => ({
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: modal === 'true' ? '' : '100vh',
    // background: `url(${backgroundImage})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    // backdropFilter: 'blur(1px)'
}));

const FormContainer = styled(Stack)(({theme}) => ({
    boxShadow: theme.shadows[4],
    borderRadius: 2,
    padding: '30px',
    width: '330px',
    backgroundColor: theme.palette.grey[200],
    '& form': {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    }
}));

//----------------------------------------------------------------

export default function LoginWrapper({children, modal = false}) {
    // debugger
    return (
        <RootStyle modal={modal.toString()}>
            {!modal && <Link
                component={RouterLink}
                to={'/'}
                sx={({palette}) => ({
                    textAlign: 'center',
                    margin: '0 20px 20px 20px',
                    textDecoration: 'none',
                    color: palette.ecommerce.pink,
                    borderBottom: '1px solid transparent',
                    '&:hover': {
                        borderBottom: `1px solid ${palette.ecommerce.pink}`
                    }
                })}
            >Back to Shop</Link>}
            <FormContainer>
                {children}
            </FormContainer>

            {!modal && <Stack
                sx={{
                    position: 'absolute',
                    bottom: '20px',
                    width: '330px',
                    alignItems: 'center'
                }}
            >
                test
            </Stack>}
        </RootStyle>
    );
}
