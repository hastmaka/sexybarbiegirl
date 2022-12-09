// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzButton from "../../components/ezComponents/EzButton/EzButton";
import {generalSliceActions} from "../../store/gs-manager-slice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function Test() {
    return (
        <RootStyle>
            <EzButton
                onClick={_ => window.dispatch(generalSliceActions.setModal({
                    open: true,
                    children: JSON.stringify(<div>Test</div>)
                }))}
            >modal</EzButton>
        </RootStyle>
    );
}
