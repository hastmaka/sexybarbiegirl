// material
import {LoadingButton} from "@mui/lab";
import {btnContained} from "../../../helper/Style";

//----------------------------------------------------------------

export default function EzLoadingBtn({children, sx, onClick, ...other}) {
    return (
        <LoadingButton sx={{...sx, ...btnContained}} onClick={onClick} {...other}>
            {children}
        </LoadingButton>
    );
}
