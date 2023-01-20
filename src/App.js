import React, {useEffect, useMemo} from 'react';
import Routes from './routes/index';
import {useDispatch, useSelector} from 'react-redux';
import {getAll, getById} from "./helper/FirestoreApi";
import {Box} from "@mui/material";
import {useCheckScreen, useConfirmDialog, useIsScroll, useNotification} from "./helper/Hooks";
import {generalSliceActions} from "./store/gs-manager-slice";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import EzModalWithTransition from "./components/ezComponents/EzModalWithTransition/EzModalWithTransition";
import {userSliceActions} from "./store/userSlice";

function App() {
    const dispatch = useDispatch();
    const {confirm} = useConfirmDialog();
    const {displayNotification} = useNotification();
    const {userStatus} = useSelector(slice => slice.user);
    const user = useMemo(() => {
        return JSON.parse(localStorage.getItem('user'))
    }, []);

    //get scroll from top for topbar shadow effect
    useIsScroll();


    useEffect(() => {
        if (!userStatus.loading && !userStatus.loaded) {
            dispatch(getAll({
                collection: 'products',
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
                    import('./helper/FirebaseAuthService').then(module => {
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
                <EzModalWithTransition/>
            </>
    );
}

export default App;