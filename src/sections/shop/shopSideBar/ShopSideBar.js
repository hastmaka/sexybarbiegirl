import {useSelector} from 'react-redux';
import EzAccordion from '../../../components/ezComponents/EzAccordion/EzAccordion';
// material
import {Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
//
import FilterPrice from './filters/filterPrice/FilterPrice';
import FilterAvailability from './filters/filterAvaliability/FilterAvailability';
import FilterColor from './filters/filterColor/FilterColor';
import FilterSize from './filters/filterSize/FilterSize';
import FilterCategory from './filters/filterCategory/FilterCategory';
import WidgetHeader from "../../../components/ezComponents/EzProductWidget/WidgetHeader";
import EzProductWidget from '../../../components/ezComponents/EzProductWidget/EzProductWidget';
import Wrapper from "../../../components/Wrapper/Wrapper";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: '100%',
    minWidth: '250px',
    maxWidth: '250px',
    padding: '0 10px 10px 0',
    [theme.breakpoints.down(900)]: {
        padding: '5px',
    }
}));

const StickySideBar = styled(Stack)(({theme}) => ({
    position: 'sticky',
    top: '115px',
    gap: '10px',
    [theme.breakpoints.down(900)]: {
        gap: '5px',
        top: 0,
    }
}));

//----------------------------------------------------------------


export default function ShopSideBar() {
    const {activeFilter} = useSelector(store => store.shop);
    const {product} = useSelector(slice => slice.shop);

    const ACCORDIONITEMS = [{
        id: 1,
        title: 'Price',
        element: <FilterPrice/>,
        defaultExpanded: activeFilter?.priceRange
    }, {
        id: 2,
        title: 'Availability',
        element: <FilterAvailability/>,
        defaultExpanded: activeFilter?.availability
    }, {
        id: 3,
        title: 'Color',
        element: <FilterColor/>,
        defaultExpanded: activeFilter?.color
    }, {
        id: 4,
        title: 'Size',
        element: <FilterSize/>,
        defaultExpanded: activeFilter?.size
    }, {
        id: 5,
        title: 'Category',
        element: <FilterCategory/>,
        defaultExpanded: activeFilter?.category
    }];

    return (
        <RootStyle>
            <StickySideBar>
                <Wrapper>
                    <WidgetHeader text='Filter' clearBtn/>
                    {ACCORDIONITEMS.map(item =>
                        <EzAccordion
                            key={item.id}
                            element={item.element}
                            title={item.title}
                            defaultExpanded={item.defaultExpanded}
                            // divider
                        />
                    )}
                </Wrapper>
                {/*new products*/}
                <EzProductWidget productToRender={product.filter((i, index) => index < 3)} header='New Products'/>
                {/*trending products*/}
                <EzProductWidget productToRender={product.filter((i, index) => index < 3)} header='Trending'/>
            </StickySideBar>
        </RootStyle>
    );
}









































