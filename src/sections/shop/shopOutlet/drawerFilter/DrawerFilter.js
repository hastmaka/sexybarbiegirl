import {useState} from "react";
// material
import {Drawer, IconButton, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import ShopSideBar from "../../shopSideBar/ShopSideBar";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function DrawerFilter() {
    const [state, setState] = useState(false);

    return (
        <RootStyle>
            <>
                <IconButton onClick={_ => setState(true)} aria-label="mobile-filter">
                    <FilterAltOutlinedIcon
                        sx={{
                            color: theme => theme.palette.ecommerce.pink
                    }}/>
                </IconButton>
                <Drawer
                    // ModalProps={{
                    //     keepMounted: true,
                    // }}
                    anchor='left'
                    open={state}
                    onClose={_ => setState(false)}
                >
                    <ShopSideBar/>
                </Drawer>
            </>
        </RootStyle>
    );
}
