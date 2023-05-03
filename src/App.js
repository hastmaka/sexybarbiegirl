import React, {lazy, Suspense, useEffect, useMemo, useState} from 'react';
import Routes from './routes/index';
import {useDispatch, useSelector} from 'react-redux';
import {getAll, getById} from "./helper/firebase/FirestoreApi";
import {Box} from "@mui/material";
import {useCheckScreen, useConfirmDialog, useIsScroll, useNotification} from "./helper/hooks";
import {generalSliceActions} from "./store/gs-manager-slice";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
// import EzModalWithTransition from "./components/ezComponents/EzModalWithTransition/EzModalWithTransition";
import {userSliceActions} from "./store/userSlice";

//async import
const EzModal = lazy(() => import('./components/ezComponents/EzModal/EzModal'));

function App() {
    const dispatch = useDispatch();
    const {confirm} = useConfirmDialog();
    const {displayNotification} = useNotification();
    const {userStatus} = useSelector(slice => slice.user);
    const [children, setChildren] = useState(null);
    const user = useMemo(() => {
        return JSON.parse(localStorage.getItem('user'))
    }, []);

    //get scroll from top for topbar shadow effect
    useIsScroll();

    //delete firebase emulator warning
    useEffect(_ => {
        const firebaseWarning = document.getElementsByClassName('firebase-emulator-warning');
        firebaseWarning[0].style.display = 'none'
    }, [])

    useEffect(() => {
        if (!userStatus.loading && !userStatus.loaded) {
            dispatch(getAll({
                collection: 'tests',//products
                filters: [{
                    field: 'active',
                    operator: '==',
                    value: true
                }]}))
            dispatch(getAll({collection: 'filters'}))
        }
    }, [dispatch, userStatus]);

    //work with indexedDb
    // useEffect(_ => {
    //     let db;
    //     const refDB = () => {
    //         if (!window.indexedDB) {
    //             console.log(`Your browser doesn't support IndexedDB`);
    //             return;
    //         }
    //         const DBOpenRequest = window.indexedDB.open('firebase-installations-database', 1);
    //         DBOpenRequest.onerror = (e) => {
    //             debugger
    //         }
    //         DBOpenRequest.onsuccess = (e) => {
    //             db = DBOpenRequest.result;
    //             readData()
    //         }
    //     }
    //     const readData = () => {
    //         const txn = db.transaction("firebase-installations-store", "readonly");
    //         const objectStore = txn.objectStore('firebase-installations-store');
    //         objectStore.openCursor().onsuccess = (event) => {
    //             debugger
    //         }
    //     }
    //     refDB()
    // }, [])

    //user logic
    useEffect(_ => {
        const getUser = async () => {
            if(!user) {
                dispatch(getById({id: 'tempUser', collection: 'users'}))
            } else {
                if(user.dummy) {
                    dispatch(userSliceActions.setUser(user))
                } else {
                    // debugger
                    import('./helper/firebase/FirebaseAuthService').then(module => {
                        module.subscribeToAuthChanges()
                    })
                }
            }
        }
        getUser()
            .then()
            .catch(err => {
                console.log(err);
            })
    }, [dispatch, user]);

    useEffect(_ => {
        window.dispatch = dispatch;
        window.setChildren = setChildren;
        window.confirm = confirm;
        window.displayNotification = displayNotification;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //get screen size
    const screenSize = useCheckScreen();
    useEffect(_ => {
        dispatch(generalSliceActions.setScreen(screenSize))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenSize]);

    if(userStatus.loading)return <Box>Loading App</Box>;

    return (
        userStatus.loaded &&
            <>
                <ScrollToTop/>
                <Routes/>
                <Suspense fallback={<div>Loading Login...</div>}>
                    <EzModal children={children}/>
                </Suspense>
            </>
    );
}

export default App;