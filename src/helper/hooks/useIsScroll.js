import {generalSliceActions} from "../../store/gs-manager-slice";
import {useEffect} from "react";

export default function useIsScroll() {
    useEffect(() => {
        const handleScroll = _ => {
            if(Math.floor(window.scrollY) === 1) {
                window.dispatch(generalSliceActions.setScroll(1))
            }
            if(window.scrollY === 0) {
                window.dispatch(generalSliceActions.setScroll(0))
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
};