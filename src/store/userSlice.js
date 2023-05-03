import {createSlice} from '@reduxjs/toolkit';
import {getAll, getById, updateAddressApi, updateCartApi, updateWishListApi} from "../helper/firebase/FirestoreApi";
import {updateCart, updateLocalStore} from "../helper/common";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        order: [],
        userStatus: {loaded: false, loading: false},
        orderStatus: {loaded: false, loading: false}
    },
    reducers: {
        setUser(state, {payload}) {
            // debugger
            state.user = {...state.user, ...payload}
            state.userStatus.loaded = true;
            updateLocalStore('user', {...state.user});
        },
        setOrder(state, {payload}) {
            state.order = [...payload];
            state.orderStatus.loaded = true;
        },

        addToWishList(state, {payload}) {
            state.user.wish_list = [...state.user.wish_list, {...payload.product}];
            updateLocalStore('user', {...state.user});
            updateWishListApi(payload.user.uid, [...state.user.wish_list]);
        },
        removeFromWishlist(state, {payload}) {
            const newWishList = state.user.wish_list.filter(item => item.id !== payload.product.id);
            state.user.wish_list = [...newWishList];
            updateLocalStore('user', {...state.user});
            updateWishListApi(payload.user.uid, [...state.user.wish_list])
        },

        addToCart(state, {payload}) {
            let cart = {...state.user.cart};
            const isVariationOnCart = cart.item.findIndex(item => item.variation_id === payload.variation.id);
            if (cart.item.length) {
                if (isVariationOnCart >= 0) {
                    state.user.cart = {...updateCart(cart, payload, isVariationOnCart, 1)}
                    if(!payload.user.dummy) {
                        updateCartApi(payload.user.uid, state.user.cart);
                    }
                } else {
                    state.user.cart = {...updateCart(state.user.cart, payload)}
                    if(!payload.user.dummy) {
                        updateCartApi(payload.user.uid, state.user.cart);
                    }
                }
            } else {
                state.user.cart = {...updateCart(state.user.cart, payload)}
                if(!payload.user.dummy) {
                    updateCartApi(payload.user.uid, {...state.user.cart});
                }
            }
            updateLocalStore('user', {...state.user});
        },
        increaseQty(state, {payload}) {
            const indexOfItemToUpdate = state.user.cart.item.findIndex(item => item.variation_id === payload.variation_id);
            state.user.cart = {...updateCart(state.user.cart, payload, indexOfItemToUpdate, 1)}
            if(!payload.user.dummy) {
                updateCartApi(payload.user.uid, state.user.cart);
            }
            updateLocalStore('user', {...state.user});
        },
        decreaseQty(state, {payload}) {
            const cart = {...state.user.cart}
            if (payload.quantity === 1) {
                if(cart.item.length === 1){
                    state.user.cart = {
                        ...state.user.cart,
                        item: [],
                        last_update: Date.now(),
                        quantity: 0,
                        sub_total: 0,
                        total: 0,
                    }
                } else {
                    cart.item = cart.item.filter(item => item.variation_id !== payload.variation_id);
                    state.user.cart = {...updateCart(cart, null)}
                }
                if(!payload.user.dummy) {
                    updateCartApi(payload.user.uid, {...state.user.cart});
                }
            } else {
                const indexOfItemToUpdate = cart.item.findIndex(item => item.variation_id === payload.variation_id);
                state.user.cart = {...updateCart(state.user.cart, payload, indexOfItemToUpdate, -1)}
                if(!payload.user.dummy) {
                    updateCartApi(payload.user.uid, state.user.cart);
                }
            }
            updateLocalStore('user', {...state.user});
        },
        removeFromCart(state, {payload}) {
            const cart = {...state.user.cart}
            cart.item = cart.item.filter(item => item.variation_id !== payload.variation_id);
            state.user.cart = {...updateCart(cart, null)}
            if(!payload.user.dummy) {
                updateCartApi(payload.user.uid, state.user.cart);
            }
            updateLocalStore('user', {...state.user});
        },

        setMainAddress(state, {payload}) {
            const address = [...state.user.address];
            const updatedAddress = address.map(item => {
                if(item.id === payload.id) {
                    item.main = !item.main
                    return item
                } else {
                    if(item.main) {
                        item.main = !item.main
                        return item
                    }
                    return item
                }
            });
            state.user.address = [...updatedAddress];
            updateAddressApi(state.user.uid, [...state.user.address]);
        },
        addAddress(state, {payload}) {
            state.user.address = [...state.user.address, {...payload}];
            updateAddressApi(state.user.uid, [...state.user.address]);
        },
        editAddress(state, {payload}) {
            let addressToUpdate = [...state.user.address].findIndex(address => address.id === payload.id);
            state.user.address[addressToUpdate] = {...payload};
            updateAddressApi(state.user.uid, [...state.user.address]);
        },
        removeAddress(state, {payload}) {
            let addressToDelete = [],
                addressToUpdate = [];
            // eslint-disable-next-line array-callback-return
            state.user.address.map(item => {
                if(item.id === payload.id) {
                    addressToDelete.push(item)
                } else {
                    addressToUpdate.push(item)
                }
            });
            if(state.user.address.length > 1 && addressToDelete[0].main) {
                addressToUpdate[0].main = !addressToUpdate[0].main
            }
            state.user.address = [...addressToUpdate];
            updateAddressApi(state.user.uid, [...state.user.address])
        },

        toggleCheck(state, {payload}){
            const cart = {...state.user.cart}
            const indexToUpdate = cart.item.findIndex(item => item.variation_id === payload.variation_id);
            state.user.cart.item[indexToUpdate] = {
                ...state.user.cart.item[indexToUpdate],
                checked: !state.user.cart.item[indexToUpdate].checked
            }
            state.user.cart = {...updateCart(cart, null)}
            if(!payload.user.dummy) {
                updateCartApi(payload.user.uid, state.user.cart);
            }
            updateLocalStore('user', {...state.user});
        },
        toggleAllCheck(state, {payload}){
            state.user.cart.item = [...state.user.cart.item].map(item => {
                return {...item, checked: true}
            })
            state.user.cart = {...updateCart(state.user.cart, null)}
            if(!payload.user.dummy) {
                updateCartApi(payload.user.uid, state.user.cart);
            }
            updateLocalStore('user', {...state.user});
        },
        toggleAllUncheck(state, {payload}){
            state.user.cart.item = [...state.user.cart.item].map(item => {
                return {...item, checked: false}
            })
            state.user.cart = {...updateCart(state.user.cart, null)}
            if(!payload.user.dummy) {
                updateCartApi(payload.user.uid, state.user.cart);
            }
            updateLocalStore('user', {...state.user});
        },
        updateCartAfterPurchase(state, {payload}){
            state.user.cart = {...updateCart(payload.cart, null)}
            updateCartApi(state.user.uid, state.user.cart);
            updateLocalStore('user', {...state.user});
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, {meta}) => {
            switch (meta.arg.collection) {
                case 'users':
                    state.orderStatus.loading = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(getAll.fulfilled, (state, {meta, payload}) => {
            switch (meta.arg.collection) {
                case 'orders':
                    state.user.order = [...payload]
                    state.orderStatus.loading = false;
                    state.orderStatus.loaded = true;
                    updateLocalStore('user', payload, 'orders');
                    // debugger
                    break;
                default:
                    return
            }
        });
        builder.addCase(getAll.rejected, (state, {payload}) => {
            debugger
            state.orderStatus = payload;
            state.orderStatus.loaded = false;
        });

        builder.addCase(getById.pending, (state, {meta}) => {
            switch (meta.arg.collection) {
                case 'users':
                    state.userStatus.loading = true;
                    break;
                case 'orders':
                    state.orderStatus.loading = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(getById.fulfilled, (state, {meta, payload}) => {
            switch (meta.arg.collection) {
                case 'users':
                    if(payload[0].dummy) {
                        const {dummy, uid, cart} = payload[0];
                        state.user = {...state.user, dummy, uid, cart}
                    } else {
                        state.user = {...payload[0]}
                    }
                    state.userStatus.loading = false;
                    state.userStatus.loaded = true;
                    updateLocalStore('user', state.user, 'setUser');
                    break;
                case 'orders':
                    state.orderStatus.loaded = true;
                    state.orderStatus.loading = false;
                    state.order = [...payload];
                    break;
                default:
                    return
            }
        });
        builder.addCase(getById.rejected, (state, {payload}) => {
            debugger
            state.message = payload;
            state.userStatus.loaded = false;
        });
    }
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;