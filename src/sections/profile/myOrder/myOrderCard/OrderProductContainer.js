// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import OrderProduct from "./OrderProduct";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridGap: '5px'
}));

//----------------------------------------------------------------

export default function OrderProductContainer({data}) {
    return (
        <RootStyle>
            {data.map(item =>
                <OrderProduct
                    key={item.variation_id}
                    img={item.image}
                    name={item.name}
                    color={item.color}
                    size={item.size}
                    price={item.price}
                    qty={item.quantity}
                />
            )}
        </RootStyle>
    );
}
