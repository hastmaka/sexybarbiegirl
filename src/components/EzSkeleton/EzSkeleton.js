// material
import {Skeleton} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Skeleton)(({theme}) => ({
    backgroundColor: 'rgba(237,237,237,0.93)'
}));

//----------------------------------------------------------------

export default function EzSkeleton({...rest}) {
    return (
        <RootStyle {...rest}/>
    );
}
