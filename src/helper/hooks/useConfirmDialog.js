import {generalSliceActions} from "../../store/gs-manager-slice";

let resolveCallback;
export default function useConfirmDialog (){
    const onConfirm = () => {
        window.dispatch(generalSliceActions.closeConfirmDialog());
        resolveCallback(true);
    };
    const onCancel = () => {
        window.dispatch(generalSliceActions.closeConfirmDialog());
        resolveCallback(false);
    };
    const confirm = ({t, title, c}) => {
        window.dispatch(generalSliceActions.showConfirmDialog({t, title, c}));
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };
    return { onConfirm, onCancel, confirm }
}