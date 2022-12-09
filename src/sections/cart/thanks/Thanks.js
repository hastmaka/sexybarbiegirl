// material
import {Button, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {useNavigate} from "react-router-dom";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 212px)',
    margin: '30px',
    border: `1px solid ${theme.palette.ecommerce.pink}`
}));

const Thank = styled(Typography)(({theme}) => ({
    fontSize: '30px'
}))

//----------------------------------------------------------------

export default function Thanks() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
        localStorage.setItem('cartState', JSON.stringify(0))
    }
    return (
        <RootStyle>
           <Thank>Thank You</Thank>
           <Typography variant='h5'>
               Your Order Was Placed.
           </Typography>
            <Button
                onClick={handleClick}
                variant="outlined"
                startIcon={<AddOutlinedIcon />}
            >
                Back To Shop
            </Button>
        </RootStyle>
    );
}