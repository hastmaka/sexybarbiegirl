// material
import HomeSectionComponent from "../homeSectionComponent/HomeSectionComponent";
import {useSelector} from "react-redux";

//----------------------------------------------------------------

export default function DailyBestSell() {
    const {product} = useSelector(slice => slice.shop);
    return (
        <HomeSectionComponent
            blackText='Daily'
            pinkText='Best Sells'
            simpleLink='See all'
            product={product}
        />
    );
}
