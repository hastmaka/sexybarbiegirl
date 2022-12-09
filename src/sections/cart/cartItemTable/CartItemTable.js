// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../components/ezComponents/EzText/EzText";
import Table from "./table/table";
import Wrapper from "../../../components/Wrapper/Wrapper";
import noItemImg from '../../../resources/no_item_in_cart.png';

//----------------------------------------------------------------

const NoItemInCartContainer = styled(Stack)(() => ({
    height: 'calc(100vh - 258px)',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
}));

const TableContainer = styled(Stack)(() => ({
    width: '100%',
}));

//----------------------------------------------------------------

export default function CartItemTable({user, screen}) {
    return (
        <Wrapper
            sx={{
                width: '100%',
                height: 'fit-content',
                flex: 2,
                padding: '20px',
            }}
        >
            <EzText text={`Items(${user.cart.item.length})`} sx={{paddingBottom: '15px'}}/>
            {!user.cart.item.length ?
                <NoItemInCartContainer>
                    <img src={noItemImg} alt='no-item-in-cart'/>
                </NoItemInCartContainer> :
                <TableContainer screen={screen}>
                    <Table
                        // td={['Product', 'Quantity', 'Total', 'Action']}
                        tr={user.cart.item}
                    />
                </TableContainer>
            }
        </Wrapper>
    );
}
