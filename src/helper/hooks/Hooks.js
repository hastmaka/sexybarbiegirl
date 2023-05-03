import {useEffect, useRef, useState} from 'react';
import {generalSliceActions} from "../../store/gs-manager-slice";

// export const useOnClickOutside = (ref, handler) => {
//     useEffect(() => {
//             const listener = event => {
//                 if (!ref.current || ref.current.contains(event.target)) {
//                     return;
//                 }
//                 handler(event);
//             };
//             document.addEventListener('mousedown', listener);
//
//             return () => {
//                 document.removeEventListener('mousedown', listener);
//             };
//         },
//         [ref, handler],
//     );
// };

// export const useIsScroll = () => {
//     useEffect(() => {
//         const handleScroll = _ => {
//             if(Math.floor(window.scrollY) === 1) {
//                 window.dispatch(generalSliceActions.setScroll(1))
//             }
//             if(window.scrollY === 0) {
//                 window.dispatch(generalSliceActions.setScroll(0))
//             }
//         };
//
//         window.addEventListener('scroll', handleScroll);
//
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [])
// };

// export const useCheckScreen = () => {
//     let [width, setWidth] = useState(window.innerWidth);
//     useEffect(() => {
//         let timeoutId = null;
//         const resizeListener = () => {
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
//         };
//         window.addEventListener('resize', resizeListener);
//         return () => {
//             window.removeEventListener('resize', resizeListener);
//         }
//     }, []);
//     return width;
// };

// export const useLocalStorage = (key, initialValue) => {
//     // State to store our value
//     // Pass initial state function to useState so logic is only executed once
//     const [storedValue, setStoredValue] = useState(() => {
//         if (typeof window === "undefined") {
//             return initialValue;
//         }
//         try {
//             // Get from local storage by key
//             const item = localStorage.getItem(key);
//             if(!item) {
//                 //set ls initial value
//                 localStorage.setItem(key, JSON.stringify(initialValue))
//             }
//             // Parse stored json or if none return initialValue
//             return item ? JSON.parse(item) : initialValue;
//         } catch (error) {
//             // If error also return initialValue
//             console.log(error);
//             return initialValue;
//         }
//     });
//     // Return a wrapped version of useState's setter function that ...
//     // ... persists the new value to localStorage.
//     const setValue = (value) => {
//         try {
//             // Allow value to be a function, so we have same API as useState
//             const valueToStore = value instanceof Function ? value(storedValue) : value;
//             // Save state
//             setStoredValue(valueToStore);
//             // Save to local storage
//             if (typeof window !== "undefined") {
//                 localStorage.setItem(key, JSON.stringify(valueToStore));
//             }
//         } catch (error) {
//             // A more advanced implementation would handle the error case
//             console.log(error);
//         }
//     };
//     return [storedValue, setValue];
// };

export const useCrossTabState = (stateKey,d) => {
    // debugger
    const [state,setState] = useState(d)
    const isNewSession = useRef(true)

    useEffect(()=>{
        if(isNewSession.current){
            const currentState = localStorage.getItem(stateKey)
            if(currentState){
                setState(JSON.parse(currentState))
            }else{
                setState(d)
            }
            isNewSession.current = false
            return
        }
        try{
            localStorage.setItem(stateKey,JSON.stringify(state))
        }catch(error){}
    },[state,stateKey,d])

    useEffect(()=>{
        // debugger
        const onReceiveMessage = (e) => {
            if(!localStorage.getItem('user') || localStorage.getItem('user') === 'undefined' ){
                localStorage.setItem(stateKey,JSON.stringify(state))
            }
            const {key,newValue, oldValue} = e;
            switch (key) {
                case 'user':
                    if(newValue !== oldValue) {
                        setState(JSON.parse(oldValue))
                    }
                    break;
                default:
                    return;
            }
            // if(key === stateKey){
            //     setState(JSON.parse(newValue))
            // }
        }
        window.addEventListener('storage',onReceiveMessage)
        return () => window.removeEventListener('storage',onReceiveMessage)
    },[stateKey,setState])

    return [state,setState]
}

// export const useNotification = () => {
//     const displayNotification = ({t, title, c, i}) => {
//         window.dispatch(generalSliceActions.showNotification({t, title, c, i}))
//     };
//     const clearNotification = _ => {
//         window.dispatch(generalSliceActions.closeNotification())
//     };
//     return { displayNotification, clearNotification }
// };

// let resolveCallback;
// export const useConfirmDialog = () => {
//     const onConfirm = () => {
//         window.dispatch(generalSliceActions.closeConfirmDialog());
//         resolveCallback(true);
//     };
//     const onCancel = () => {
//         window.dispatch(generalSliceActions.closeConfirmDialog());
//         resolveCallback(false);
//     };
//     const confirm = ({t, title, c}) => {
//         window.dispatch(generalSliceActions.showConfirmDialog({t, title, c}));
//         return new Promise((res, rej) => {
//             resolveCallback = res;
//         });
//     };
//     return { onConfirm, onCancel, confirm }
// }



//test
const initBeforeUnLoad = (showExitPrompt) => {
    window.onbeforeunload = (event) => {
        if (showExitPrompt) {
            const e = event || window.event;
            e.preventDefault();
            if (e) {
                e.returnValue = '';
            }
            return '';
        }
    };
};

// Hook
export default function useExitPrompt(bool) {
    debugger
    const [showExitPrompt, setShowExitPrompt] = useState(bool);

    window.onload = function() {
        initBeforeUnLoad(showExitPrompt);
    };

    useEffect(() => {
        initBeforeUnLoad(showExitPrompt);
    }, [showExitPrompt]);

    return [showExitPrompt, setShowExitPrompt];
}