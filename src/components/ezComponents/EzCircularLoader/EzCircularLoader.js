// material
import CircularProgress from '@mui/material/CircularProgress';

//----------------------------------------------------------------

export default function EzCircularLoader() {
    return <CircularProgress
        disableShrink
        thickness={2}
        size={20}
        sx={({palette}) => ({
            color: palette.ecommerce.pink,
            marginTop: '20px'
        })}
    />;
}
