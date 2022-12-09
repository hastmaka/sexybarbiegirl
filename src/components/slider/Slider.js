import React, {useRef} from 'react';
//material
import {Box, Button, IconButton, Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
//
import {useSlider} from '../../helper/Hooks';
//----------------------------------------------------

const SliderContainer = styled(Stack)(({theme}) => ({
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 'calc(100vh - 110px)',
    width: '100%',
}));

const SliderContent = styled(Stack)(({theme}) => ({
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
}));

const IconButtonContainer = styled(IconButton)(({theme}) => ({
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: '4rem',
    color: '#eee',
    padding: '0 1rem',
    cursor: 'pointer',
    transition: 'transform 0.1s ease-in-out',
}))

//----------------------------------------------------

export default function Slider({images}) {
    const slideImage = useRef(null)
    const slideText = useRef(null)
    const {goToPreviousSlide, goToNextSlide} = useSlider(slideImage, slideText, images)

    return (
        <SliderContainer ref={slideImage}>
            <SliderContent>
                <IconButtonContainer onClick={goToPreviousSlide}>
                    <ChevronLeftIcon/>
                </IconButtonContainer>
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant='h1' sx={{fontSize: '2.5rem', color: '#fff', textTransform: 'uppercase', fontWeight: 700}}>Dreaming</Typography>
                    <p ref={slideText} className='feature--text'></p>
                    <Button
                        sx={{
                            background: '#fff',
                            textTransform: 'uppercase',
                            color: '#444',
                            border: '1px solid #444',
                            outline: 'none',
                            fontWeight: '700',
                            padding: '0.8rem 2rem',
                            cursor: 'pointer',
                        }}
                    >Get started</Button>
                </Box>
                <IconButtonContainer onClick={goToNextSlide}>
                    <ChevronRightIcon/>
                </IconButtonContainer>
            </SliderContent>
        </SliderContainer>
    );
}