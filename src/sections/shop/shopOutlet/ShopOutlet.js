import {useSelector} from 'react-redux';
// material
import {Box, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
//
// import ProductCard from '../../../components/productCard/ProductCard';
import SortBy from "./sortBy/SortBy";
import DrawerFilter from "./drawerFilter/DrawerFilter";
import EzProductCard from "../../../components/ezComponents/EzProductCard/EzProductCard";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    width: '100%',
    background: theme.palette.ecommerce.bg_parent,
    gap: '5px'
}));

const ToolBarContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '52px',
    width: '100%',
    padding: '0 10px',
    backgroundColor: theme.palette.grey[0],
    boxShadow: theme.shadows[5],
    borderRadius: '4px',
    [theme.breakpoints.down(900)]: {
        marginTop: '5px',
    }
}));

const ToolBarLeft = styled(Stack)({
    flexDirection: 'row',
    gap: '5px'
});

const ToolBarRight = styled(Stack)({
    flexDirection: 'row'
});

const ProductContainer = styled(Box)(({theme}) => ({
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: 'repeat(4, 1fr)',
    padding: '5px 0 10px 0',
    [theme.breakpoints.down(900)]: {
        gridTemplateColumns: 'repeat(2, 1fr) !important',
        gridGap: '5px',
        padding: '0 0 5px 0',
    },
    [theme.breakpoints.down(1200)]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
        // padding: '5px',
    }
}));

//----------------------------------------------------------------

export default function ShopOutlet() {
    const {product, filter, activeFilter} = useSelector(slice => slice.shop);
    const {screen} = useSelector(slice => slice.generalState);

    const filteredItem = Object.keys(activeFilter).length ? [...product].filter(item => {
        let condition = true;
        for (const [key, value] of Object.entries(filter)) {
            if (!condition) break;
            if (key === 'priceRange' && activeFilter.priceRange) {
                condition = item.price >= value[0] && item.price <= value[1];
            }
            if (key === 'availability' && activeFilter.availability) {
                condition = item.stock === (value === 'instock')
            }
            if (key === 'color' && activeFilter.color) {
                let checkedColor = value.filter(v => v.checked);
                if(checkedColor.length) {
                    condition = checkedColor.some(color => item.color.includes(color.name))
                }
            }
            if (key === 'size' && activeFilter.size) {
                let checkedSize = value.filter(v => v.checked);
                if(checkedSize.length) {
                    condition = checkedSize.some(size => item.size.includes(size.name))
                }
            }
            if (key === 'category' && activeFilter.category) {
                let checkedCategory = value.filter(v => v.checked);
                if(checkedCategory.length) {
                    condition = checkedCategory.some(category => item.category.includes(category.name))
                }
            }
        }
        return condition
    }) : product;

    return (
        <RootStyle>
            <ToolBarContainer>
                <ToolBarLeft>
                    {screen <= 786 && <DrawerFilter/>}
                </ToolBarLeft>
                <ToolBarRight>
                    <SortBy/>
                </ToolBarRight>

            </ToolBarContainer>
            <ProductContainer>
                {filteredItem.map(item =>
                    <EzProductCard
                        key={item.id}
                        product={item}
                    />
                )}
            </ProductContainer>
        </RootStyle>
    );
}
