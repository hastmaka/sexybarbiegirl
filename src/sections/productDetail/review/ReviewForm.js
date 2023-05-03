// material
import {FormControlLabel, FormGroup, Stack, TextareaAutosize, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzRating from "../../../components/ezComponents/EzRating/EzRating";
import EzButton from "../../../components/ezComponents/EzButton/EzButton";
import {useSelector} from "react-redux";
import {useState} from "react";
import {create} from "../../../helper/firebase/FirestoreApi";
import EzCheckBox from "../../../components/ezComponents/EzCheckBox/EzCheckBox";

//----------------------------------------------------------------
const RootStyle = styled(Stack)(({modal, theme}) => ({
    position: 'relative',
    gap: '20px',
    padding: '10px',
    width: modal === 'true' ? '95vw' : ''
}));

const DisableReview = styled(Stack)(({theme}) => ({
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99999957',
    zIndex: 10,
    height: '100%',
    width: '100%',
    borderRadius: '4px',
    top: 0,
    left: 0
}));

const HeaderText = styled(Typography)(({theme}) => ({
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize',
    color: theme.palette.ecommerce.inactive_color
}));

//----------------------------------------------------------------

export default function ReviewForm({product_id, setTotalReview, modal = false, handleClose}) {
    const {user} = useSelector(slice => slice.user);
    const [rating, setRating] = useState(0);
    const [checked, setChecked] = useState(false);

    const onHandleRating = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let content = data.get('content'),
            checkLength = content.split(' ').join(''),
            sanitizedText = content.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        if (rating === 0 || rating === null) {//rating become null after take all star off
            return window.displayNotification({
                t: 'error',
                c: 'Please, submit a Rating'
            })
        } else if (content === '') {
            return window.displayNotification({
                t: 'error',
                c: 'Please, write something'
            })
        } else if (checkLength.length < 1) {
            return window.displayNotification({
                t: 'warning',
                c: 'Minimum 25 characters'
            })
        } else if (!checked) {
            return window.displayNotification({
                t: 'warning',
                c: 'Accept Community Guidelines first.'
            })
        }
        //ready to save the review
        window.dispatch(create({
            collection: 'reviews',
            data: {
                content: sanitizedText,
                create_at: Date.now(),
                email: user.email,
                uid: user.uid,
                product_id: product_id,
                rating: rating,
                active: true
            }
        }));
        e.currentTarget[0].value = '';
        setTotalReview(prev => prev + 1)
        setRating(0);
        setChecked(false);
        if (modal) {
            handleClose()
        }
    }

    return (
        <RootStyle modal={modal.toString()}>
            {user.dummy && <DisableReview>
                <HeaderText
                    sx={{
                        fontSize: {lg: '50px', md: '40px', sm: '30px'},
                        color: 'rgba(167,69,150,0.2)'
                    }}
                >
                    Sign in to write a Review
                </HeaderText>
            </DisableReview>}
            <HeaderText variant='span' sx={{fontSize: '13px', textAlign: 'center'}}>
                Leave us a Review
            </HeaderText>
            <Stack gap='10px' p='0 20px'>
                <Stack flexDirection='row' gap='2px'>
                    <HeaderText variant='snap'>Your Rating </HeaderText>
                    <HeaderText variant='snap' sx={{color: '#f438de'}}>*</HeaderText>
                </Stack>
                <Stack width='fit-content'>
                    <EzRating
                        readOnly={user.dummy}
                        label
                        size='medium'
                        temValue={rating}
                        getValue={e => setRating(e)}
                    />
                </Stack>
            </Stack>
            <Stack gap='10px' p='0 20px'>
                <Stack flexDirection='row' gap='2px'>
                    <HeaderText variant='snap'>Your Review </HeaderText>
                    <HeaderText variant='snap' sx={{color: '#f438de'}}>*</HeaderText>
                </Stack>
                <Stack component='form' onSubmit={onHandleRating} width='100%' gap='10px'>
                    <TextareaAutosize
                        name='content'
                        aria-label="review_textarea"
                        placeholder="Write your review..."
                        minRows={5}
                        style={{
                            fontWeight: 500,
                            color: '#767193',
                            width: '100%',
                            resize: 'none',
                            borderRadius: '4px',
                            padding: '10px 20px',
                            borderColor: '#e1d3d3',
                            pointerEvents: user.dummy ? 'none' : '',
                            // '::placeholder': {
                            //     color: 'red'
                            // },
                            // ':focus': {
                            //     borderColor: 'red',
                            // }
                        }}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <EzCheckBox
                                    size='small'
                                    checked={checked}
                                    onChange={_ => setChecked(prev => !prev)}
                                />
                            }
                            label={<HeaderText>Accept Community Guideline, to submit a review.</HeaderText>}
                        />
                    </FormGroup>
                    <Stack alignItems='flex-end'>
                        <EzButton
                            type='submit'
                            sx={{
                                backgroundColor: theme => theme.palette.ecommerce.pink,
                                color: theme => theme.palette.ecommerce.selectedColor,
                                border: `1px solid ${'#f438de'}`,
                                padding: '7px 15px',
                                width: '100px',
                                '&:hover': {
                                    color: theme => theme.palette.ecommerce.selectedColor,
                                    backgroundColor: theme => theme.palette.ecommerce.pink,
                                    boxShadow: theme => theme.shadows[10]
                                },
                                '& .MuiButton-startIcon': {
                                    margin: '0 2px 0 0'
                                }
                            }}
                        >
                            Save
                        </EzButton>
                    </Stack>
                </Stack>
            </Stack>
        </RootStyle>
    );
}
