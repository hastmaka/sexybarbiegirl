import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    addDoc,
    collection as firestoreCollection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where
} from "firebase/firestore";
import {db} from "./FirebaseConfig";

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
        try {
            const data = await getDoc(doc(db, collection, id));
            if (!data.data()) {debugger}//if the user doesn't exist
            if(collection === 'products') {
                return {...data.data(), id: id}
            }
            return data.data();
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
            let data = collection === 'stripe_customers' ? {} : [];
            let res = await getDocs(q);
            res.docs.map(doc =>
                collection === 'stripe_customers' ?
                    data = {...doc.data(),id: doc.id} :
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



