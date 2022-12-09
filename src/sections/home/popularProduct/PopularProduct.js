// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import HomeSectionComponent from "../homeSectionComponent/HomeSectionComponent";
import {useSelector} from "react-redux";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    border: '1px solid black',
    height: '546px'
}));

//----------------------------------------------------------------

export default function PopularProduct() {
    const {product} = useSelector(slice => slice.shop);
    return (
        <HomeSectionComponent
            blackText='Popular'
            pinkText='Products'
            simpleLink='See all'
            product={product}
        />
    );
}
