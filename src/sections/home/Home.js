// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import TopSwiper from "./topSwiper/TopSwiper";
import HotPromotion from "./hotPromotion/HotPromotion";
import DailyBestSell from "./dailyBestSell/DailyBestSell";
import PopularProduct from "./popularProduct/PopularProduct";
import {useIsScroll} from "../../helper/Hooks";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    alignItems: 'center',
    backgroundColor: theme.palette.ecommerce.bg_parent
}));

const HomeFixContent = styled(Stack)(({theme}) => ({
    maxWidth: '1432px',
    width: '100%',
}));

const FixSection = styled(Stack)(({theme}) => ({
    margin: '0 0 20px 0'
}));

//----------------------------------------------------------------

export default function Home() {
    //get scroll from top for topbar shadow effect
    useIsScroll();
    return (
        <RootStyle>
            <HomeFixContent>
                <TopSwiper/>
                <HotPromotion/>
                <FixSection>
                    <DailyBestSell/>
                    <PopularProduct/>
                </FixSection>
                {/*<TopTrendingAdded/>*/}
            </HomeFixContent>
        </RootStyle>
    );
}
