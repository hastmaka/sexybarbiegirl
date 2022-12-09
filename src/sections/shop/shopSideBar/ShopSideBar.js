import {useSelector} from 'react-redux';
import EzAccordion from '../../../components/ezComponents/EzAccordion/EzAccordion';
// material
import {Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
//
import FilterPrice from './filterPrice/FilterPrice';
import FilterAvailability from './filterAvaliability/FilterAvailability';
import FilterColor from './filterColor/FilterColor';
import FilterSize from './filterSize/FilterSize';
import FilterCategory from './filterCategory/FilterCategory';
import ClearBtn from "./localComponents/ClearBtn";
import {shopSliceActions} from "../../../store/shopSlice";
import WidgetHeader from "./WidgetHeader";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: '100%',
    minWidth: '250px',
    maxWidth: '250px',
    padding: '0 10px 0 0',
    [theme.breakpoints.down(900)]: {
        padding: '0 5px 0 0',
    }
}));

const StickySideBar = styled(Stack)(({theme}) => ({
    position: 'sticky',
    top: '115px',
    gap: '10px',
    [theme.breakpoints.down(900)]: {
        gap: '5px'
    }
}));

const FilterContainer = styled(Stack)(({theme}) => ({
    backgroundColor: '#FFF',
    borderRadius: '4px',
}));

const NewProductContainer = styled(Stack)(({theme}) => ({
    height: '300px',
    backgroundColor: '#FFF',
    borderRadius: '4px',
}));

const TrendingContainer = styled(Stack)(({theme}) => ({
    height: '300px',
    backgroundColor: '#FFF',
    borderRadius: '4px',
    marginBottom: '10px'
}))

//----------------------------------------------------------------


export default function ShopSideBar() {
    const {activeFilter} = useSelector(store => store.shop);

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
                <FilterContainer>
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
                </FilterContainer>
                <NewProductContainer>
                    <WidgetHeader text='New Products'/>
                </NewProductContainer>
                <TrendingContainer>
                    <WidgetHeader text='Trending'/>
                </TrendingContainer>
            </StickySideBar>
        </RootStyle>
    );
}
