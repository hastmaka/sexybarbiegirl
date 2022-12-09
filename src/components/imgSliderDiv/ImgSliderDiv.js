//material
import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';

const RootStyle = styled(Box)(({img, theme}) => ({
    backgroundImage: `url(${img})`,
    backgroundPosition: 'top center',
    backgroundRepeat: 'no repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '130px',
    cursor: 'pointer',
    borderRadius: '2px',
    transition: 'all 200ms',
    '&:hover': {
        transform: 'scale(1.05)'
    },
    [theme.breakpoints.down('sm')]: {
        height: '100px',
    },
}))

export const ImgSliderDiv = ({onClickHandle, img}) => {
    return (
        <RootStyle
            img={img}
            onClick={_ => onClickHandle(img)}
        />
    )
}
