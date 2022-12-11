// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import ClearBtn from "../../../sections/shop/shopSideBar/localComponents/ClearBtn";
import {shopSliceActions} from "../../../store/shopSlice";
import EzText from "../EzText/EzText";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection:'row',
    justifyContent:'space-between', 
    height: '46px'
}));

//----------------------------------------------------------------

export default function WidgetHeader({text, clearBtn}) {
    return (
        <RootStyle>
            <EzText
                text={text}
                variant='span'
                sx={{
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: '16px',
                    position: 'relative',
                    marginBottom: '20px',
                    padding: '15px 0 0 15px',
                    '&:before': {
                        background: theme => theme.palette.ecommerce.pink,
                        bottom: '-9px',
                        content: '""',
                        height: '1px',
                        left: '15px',
                        position: 'absolute',
                        width: '50px',
                    }
                }}
            />
            {clearBtn && <ClearBtn
                onClick={_ => window.dispatch(shopSliceActions.removeAllFilter())}
                tooltip='Clear Filters'
                sx={{
                    position: 'relative',
                    top: '5px',
                }}
            />}
        </RootStyle>
    );
}
