import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    addDoc,
    collection as firestoreCollection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    onSnapshot
} from "firebase/firestore";
import {db} from "./FirebaseConfig";
import {userSliceActions} from "../store/userSlice";

export const create = createAsyncThunk(
    'firestore/create',
    async ({collection, data}, {rejectWithValue})  => {
        try {
            const res = await addDoc(firestoreCollection(db, collection), data);
            return res.id
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const update = createAsyncThunk(
    'firestore/update',
    async ({id, collection, data}, {rejectWithValue})  => {
        let tempData  = collection === 'stripe_customers' ? {payment_method: data} : data
        try {
            await setDoc(doc(firestoreCollection(db, collection), id), tempData, {merge: true})
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getById = createAsyncThunk(
    'firestore/getById',
    async ({id, collection}, {rejectWithValue})  => {
        let promise = [];
        switch (collection) {
            case 'products':
            case 'users':
            case 'stripe_customers':
                promise.push(getDoc(doc(db, collection, id)))
                break;
            case 'orders':
                id.map(item => promise.push(getDoc(doc(db, collection, item))))
                break;
            default:
                return
        }
        try {
            let data = [];
            const tempData = await Promise.all(promise);
            tempData.forEach(doc => {
                data.push({...doc.data(), id: doc.id})
            })
            return data;
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAll = createAsyncThunk(
    'firestore/getAll',
    async ({collection, filters = [], lim = null}, {rejectWithValue})  => {
        let queries = [];
        if (filters.length) {
            for (const filter of filters) {
                queries.push(where(filter.field, filter.operator, filter.value));
            }
        }
        let q = query(firestoreCollection(db, collection), ...queries);
        try {
            let data = [];
            let res = await getDocs(q);
            res.docs.map(doc =>
                data.push({...doc.data(),id: doc.id})
            )
            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

/**
 *
 * @param uid - user id
 * @param data - field to update
 * @param collection - collection to update
 *
 * updateApi is used when you want to update something in db, but there is no need to pass the data
 * through any slice.
 */

export const updateApi = (uid, collection, data) => {
    debugger
    try {
        setDoc(doc(db, collection, uid), {data: {...data}}, {merge: true})
            .then()
    } catch (err) {
        debugger
        console.log(err);
    }
};

export const updateCartApi = (uid, cart) => {
    try {
        setDoc(doc(db, 'users', uid), {cart: {...cart}}, {merge: true})
            .then()
    } catch (err) {
        debugger
        console.log(err);
    }
};

export const updateWishListApi = (uid, wish_list) => {
    try {
        setDoc(doc(db, 'users', uid), {wish_list: [...wish_list]}, {merge: true})
            .then()
    } catch (err) {
        debugger
        console.log(err);
    }
};

export const updateAddressApi = (uid, address) => {
    try {
        setDoc(doc(db, 'users', uid), {address: [...address]}, {merge: true})
            .then()
    } catch (err) {
        debugger
        console.log(err);
    }
};


/**
 * onSnapshot - to listen to event local and on server
 * @param id
 * @param collection
 * @returns {Promise<void>}
 */
export const getRTDataFromUserOrder = async ({userId, collection}) => {
    const q = query(firestoreCollection(db, collection), where('userId', "==", userId));
    await onSnapshot(q, {includeMetadataChanges: true}, (querySnapshot) => {
        debugger
        const order = [];
        querySnapshot.forEach(doc => {
            order.push({...doc.data(), id: doc.id});
        });
        window.dispatch(userSliceActions.setOrder(order))
    });
}

export const createOrder = ({data, id}) => {
    try {
        setDoc(doc(db, 'orders', id), {...data}, {merge:true})
            .then()
    } catch (err) {
        debugger
        console.log(err)
    }
}
