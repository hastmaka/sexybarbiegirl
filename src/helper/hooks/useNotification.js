import {generalSliceActions} from "../../store/gs-manager-slice";


export default function useNotification(){
    const displayNotification = ({type, title, content, important}) => {
        window.dispatch(generalSliceActions.showNotification({type, title, content, important}))
    };
    return { displayNotification }
};