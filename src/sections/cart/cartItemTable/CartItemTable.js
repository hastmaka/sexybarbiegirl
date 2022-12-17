// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../components/ezComponents/EzText/EzText";
import Table from "./table/table";
import Wrapper from "../../../components/Wrapper/Wrapper";
import noItemImg from '../../../resources/no_item_in_cart.png';
import {userSliceActions} from "../../../store/userSlice";
import {useSelector} from "react-redux";

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

const linkStyle = {
    borderBottom: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 200ms',
    '&:hover': {
        borderBottom: '1px solid #999',
    }
}

//----------------------------------------------------------------

export default function CartItemTable({user, screen}) {
    return (
        <Wrapper
            sx={{
                width: '100%',
                height: 'fit-content',
                flex: 3,
                padding: '20px',
            }}
        >
            <Stack flexDirection='row' gap='10px' sx={{paddingBottom: '15px'}}>
                <EzText text={`Items(${user.cart.item.length})`}/>
                <EzText
                    onClick={_ => window.dispatch(userSliceActions.toggleAllCheck({user}))}
                    text='Check All'
                    sx={{...linkStyle}}
                />
                <EzText
                    onClick={_ => window.dispatch(userSliceActions.toggleAllUncheck({user}))}
                    text='Uncheck All'
                    sx={{...linkStyle}}
                />
            </Stack>

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
