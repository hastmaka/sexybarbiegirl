import {useSelector} from "react-redux";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import Table from './table/table';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    backgroundColor: '#fff',
    boxShadow: theme.shadows[5],
    borderRadius: '4px',
    height: 'calc(100vh - 150px)',
    [theme.breakpoints.down(786)]: {
        borderRadius: '4px 0 0 4px',
        height: 'calc(100vh - 85px)',
    }
}));

const NoItemInWishlistContainer = styled(Stack)(({theme}) => ({
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
}));

//----------------------------------------------------------------

export default function WishList() {
    const {user} = useSelector(slice => slice.user);
    // debugger
    return (
        <RootStyle>
            {!user.wish_list.length ?
                <NoItemInWishlistContainer>
                    No Wishlist Item
                </NoItemInWishlistContainer> :
                <Table
                    td={['Product', 'Total', 'Action']}
                    tr={user.wish_list}
                />
            }
        </RootStyle>
    );
}
