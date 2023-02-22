// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddCommentIcon from '@mui/icons-material/AddComment';
//
import ReviewCard from "./ReviewCard";
import EzCustomIconButton from "../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
import {useSelector} from "react-redux";
import ReviewForm from "./ReviewForm";
import {generalSliceActions} from "../../../store/gs-manager-slice";
//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '10px',
    width: '100%',
    backgroundColor: '#fff',
    padding: '20px 0',
    borderRadius: '4px',
}));

const HeaderContainer = styled(Stack)(({theme}) => ({
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    borderBottom: '1px solid #c9c9c9'
}));

const RootStyleFix = styled(Stack)(({theme}) => ({
    width: '100%',
    // height: '500px',//temp
    gap: '20px',
    flexDirection: 'row'
}));

const ReviewCardContainer = styled(Stack)(({theme}) => ({
    gap: '20px',
    flex: 1,
    height: 'fit-content'
}));

const HeaderText = styled(Typography)(({theme}) => ({
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize',
    color: theme.palette.ecommerce.inactive_color
}));

const ReviewFormContainer = styled(Stack)(({theme}) => ({
    flex: 1,
    borderRadius: '4px',
    height: 'fit-content',
    border: ' 1px solid #e1e1e175',
    margin: '0 10px 0 0',
    boxShadow: theme.shadows[1],
}));

//----------------------------------------------------------------

export default function Review({review, total_review, product_id, setTotalReview}) {
    const {screen, modal} = useSelector(slice => slice.generalState);
    const {user} = useSelector(slice => slice.user);

    return (
        <RootStyle>
            <HeaderContainer>
                <HeaderText variant='span' sx={{fontSize: '16px'}}>
                    Reviews ({total_review})
                </HeaderText>
                {screen <= 786 &&
                    (!user.dummy ?
                        <EzCustomIconButton
                            icon={<AddCommentIcon sx={{transform: 'scaleX(-1)'}}/>}
                            toolTipTitle='Add Review'
                            ariaLabel='add_review'
                            onClick={_ => window.dispatch(generalSliceActions.setModal({open: true, who: 'reviewForm'}))}
                            /> :
                        <AddCommentIcon
                            disabled={true}
                            sx={{
                                transform: 'scaleX(-1)',
                                marginBottom: '3px'
                            }}
                        />
                    )
                }
            </HeaderContainer>
            <RootStyleFix>
                <ReviewCardContainer>
                    {review.map(item =>
                        <ReviewCard
                            key={item.id}
                            // img={item.img}
                            email={item.email}
                            date={item.create_at}
                            rating={item.rating}
                            content={item.content}
                        />
                    )}
                </ReviewCardContainer>

                {screen >= 786 &&
                    <ReviewFormContainer>
                        <ReviewForm product_id={product_id} setTotalReview={setTotalReview}/>
                    </ReviewFormContainer>
                }
            </RootStyleFix>
        </RootStyle>
    );
}
