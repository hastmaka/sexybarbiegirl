// material
import {IconButton, Stack, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteFilterIcon = styled(IconButton)(({theme}) => ({
    color: theme.palette.ecommerce.pink,
    '&:hover': {
        color: theme.palette.ecommerce.gold,
        backgroundColor: 'transparent'
    }
}));

//----------------------------------------------------------------

export default function ClearBtn({onClick, tooltip, disabled, ...others}) {
    return (
        <>
            <Tooltip title={tooltip} arrow placement='right'>
                <span>{/* span required by toolkit */}
                    <DeleteFilterIcon
                        onClick={onClick}
                        disabled={disabled}
                        {...others}
                    >
                        <DeleteIcon/>
                    </DeleteFilterIcon>
                </span>
            </Tooltip>
        </>
    );
}
