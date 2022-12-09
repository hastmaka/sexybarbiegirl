// material
import {Dialog, Zoom} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import EzCustomIconButton from "../EzCustomIconButton/EzCustomIconButton";
import {forwardRef} from "react";

//----------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
    return <Zoom direction="down"  ref={ref} {...props} />;
});

//----------------------------------------------------------------

export default function EzModal({open, handleClose, children}) {
    return (
        <Dialog
            open={open}
            onClose={(e, reason) => {
                // debugger
            }}
            TransitionComponent={Transition}
            maxWidth='lg'
            // keepMounted
            transitionDuration={{enter: 200, exit: 500}}
            aria-describedby="modal_with_transition"
            sx={{
                '& .MuiDialog-paper': {
                    margin: 0,
                    borderRadius: '4px',
                }
            }}
        >
            <EzCustomIconButton
                icon={<CloseIcon/>}
                // toolTipTitle='Close'
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 0,
                    margin: '10px',
                    zIndex: 1000
                }}
            />
            {children}
        </Dialog>
    );
}