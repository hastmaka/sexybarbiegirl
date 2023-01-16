import {useSelector} from "react-redux";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import HotPromotionCounter from "./HotPromotionCounter";
import HotPromotionCard from "./HotPromotionCard";
import EzButton from "../../../components/ezComponents/EzButton/EzButton";

//----------------------------------------------------------------

const Time = styled(Stack)(({theme}) => ({
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    top: '35%',
    right: '',
    flexDirection: 'row',
    gap: '8px',
    [theme.breakpoints.down(786)]: {
        width: '',
        top: '-35px',
        right: '20px',
        justifyContent: 'flex-end',
    }
}));

const HotPromotionCardContainer = styled(Stack)(({theme}) => ({
    position: 'absolute',
    width: '100%',
    height: '177px',
    top: '75%',
    alignItems: 'center'
}));

//----------------------------------------------------------------


export default function HotPromotionComponent({time, bgImg, bgImgCard, name, rating, description, price}) {
    const {screen} = useSelector(slice => slice.generalState);
    return (
        <Stack
            sx={{
                position: 'relative',
                borderRadius: screen >= 786 ? '4px' : 0,
                width: '100%',
                height: '354px',
                background: `url(${bgImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Time>
                <HotPromotionCounter text='Days'/>
                <HotPromotionCounter text='Hours'/>
                <HotPromotionCounter text='Min'/>
                <HotPromotionCounter text='Sec'/>
            </Time>
            {screen >= 786 && <HotPromotionCardContainer>
                <HotPromotionCard
                    name={name}
                    rating={rating}
                    description={description}
                    price={price}
                    bgImgCard={bgImgCard}
                />
            </HotPromotionCardContainer>}
            {screen <= 786 &&
                <EzButton
                    variant="outlined"
                    sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                    }}
                >
                    ShopTest
                </EzButton>
            }
        </Stack>
    );
}
