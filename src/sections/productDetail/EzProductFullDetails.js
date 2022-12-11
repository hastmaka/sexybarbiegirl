import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import Review from "./review/Review";
//
import {getAll, getById} from "../../helper/FirestoreApi";
import EzProductDetails from "./EzProductDetails";
import HomeSectionComponent from "../home/homeSectionComponent/HomeSectionComponent";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    width: '100%',
    alignItems: 'center',
}));

const RootStyleFix = styled(Stack)(({theme}) => ({
    margin: '10px 0 10px 0',
    maxWidth: '1432px',
    width: '98vw',
    gap: '10px',
}));

const SectionThree = styled(Stack)(({theme}) => ({
    width: '100%',
    // height: '500px'
}));


//----------------------------------------------------------------

export default function EzProductFullDetails() {
    const {pathname} = useLocation();
    const product_id = pathname.split('/')[2];
    const {reviewState, review, singleProductState, singleProduct, product} = useSelector(slice => slice.shop);
    const [totalReview, setTotalReview] = useState(0);
    // debugger

    useEffect(_ => {
        if(!singleProductState.loaded) {
            window.dispatch(getById({id: product_id, collection: 'products'}));
        }
        if(singleProductState.loaded) {
            setTotalReview(singleProduct.statistic.total_review)
        }
    }, [singleProductState, product_id])

    useEffect(_ => {
        window.dispatch(getAll({
            collection: 'reviews',
            filters: [{
                field: 'product_id',
                operator: '==',
                value: product_id
            }]
        }))
    }, [product_id]);

    if(singleProductState.loading) return <div>Loading...product</div>

    return (
        <RootStyle>
            <RootStyleFix>
                {singleProductState.loaded && <EzProductDetails product={singleProduct} totalReview={totalReview}/>}

                {reviewState.loading && <Stack>Loading Reviews...</Stack>}
                {reviewState.loaded &&
                    <Review
                        review={review}
                        total_review={totalReview}
                        product_id={product_id}
                        setTotalReview={setTotalReview}
                    />
                }

                <SectionThree>
                    <HomeSectionComponent
                        blackText='Related'
                        pinkText='Products'
                        simpleLink='See all'
                        product={product}
                    />
                </SectionThree>
            </RootStyleFix>
        </RootStyle>
    );
}
