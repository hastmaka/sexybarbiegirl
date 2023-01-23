import {useSelector} from "react-redux";
// material
import {Alert, AlertTitle, Slide, Snackbar, Typography} from "@mui/material";
//
import {useNotification} from "../../../helper/Hooks";

//----------------------------------------------------------------

function GrowTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function EzNotification() {
    const {clearNotification} = useNotification();
    const {notification} = useSelector(slice => slice.generalState);
    return (
        <Snackbar
            open={notification.open}
            autoHideDuration={notification.timeout}
            onClose={(e, reason) => {
                if(!(reason === 'clickaway')) {
                    clearNotification()
                } else if (reason === 'escapeKeyDown') {
                    clearNotification()
                }
            }}
            TransitionComponent={GrowTransition}
        >
            <Alert
                onClose={_ => clearNotification()}
                variant='filled'
                severity={notification.t}
                sx={{
                    fontSize: '13px !important',
                    color: '#dd0095',
                    // borderRadius: '4px',
                    background: 'rgba(231, 231, 231, 72%)',
                    border: '1px solid #E9E9E9',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
            >
                {notification.title !== '' && <AlertTitle sx={{fontWeight: 700}}>{notification.title}</AlertTitle>}
                <Typography
                    sx={{
                        fontSize: '11px'
                    }}
                    variant='span'
                >{notification.c}
                </Typography>

            </Alert>
        </Snackbar>
    );
}