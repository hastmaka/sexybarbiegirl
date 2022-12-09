// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useSelector} from "react-redux";
import Table from './table/table';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '20px',
    [theme.breakpoints.down(786)]: {
        borderRadius: '4px 0 0 4px'
    }
}));

//----------------------------------------------------------------

export default function WishList() {
    const {user} = useSelector(slice => slice.user);
    // debugger
    return (
        <RootStyle>
            <Table
                td={['Product', 'Total', 'Action']}
                tr={user.wish_list}
            />
        </RootStyle>
    );
}
