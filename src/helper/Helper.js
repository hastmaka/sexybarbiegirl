import {generalSliceActions} from "../store/gs-manager-slice";
import {userSliceActions} from "../store/userSlice";
import {fetchAPI} from "./FetchApi";
import {getCustomerData, url} from "./stripe/StripeApi";
import {stripeSliceActions} from "../store/stripeSlice";

export const sortPaymentMethod = (stripePm, firebasePm) => {
    let defaultPm = firebasePm.find(item => item.main);
    return [...stripePm].sort((x,y) => x['id'] === defaultPm.pm ? -1 : y['id'] === defaultPm.pm);
}
export const getColor = (v) => {
    let tempV = [];
    Object.entries(v).map(item => tempV.push(item[0]));
    return tempV
};

export const getActiveSize = (v) => {
    const active = v.find(item => item.active)
    return active.size;
};

export const getVariation = (v) => {
    let tempA = [];
    v.reduce((acc, curr) => {
        if (!acc[curr.color]) {
            acc[curr.color] = [];
            acc[curr.color] = [{...curr}];
        } else {
            acc[curr.color] = [...acc[curr.color], curr]
        }
        return tempA = acc
    }, {})
    return tempA;
};

export const calcDiscount = (price, discount) => {
    return (price * (100 - discount) / 100).toFixed(2);
}

export const createId = _ => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const handleDecimalsOnValue = (value) => {
    // eslint-disable-next-line
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
};

export const formatSizeArray = (s, i) => {
    return (i ? ', ' : '') + `${s === 1 ? 'XS' : s === 2 ? 'S' : s === 3 ? 'M' : s === 4 ? 'L' : s === 5 ? 'XL' : ''}`
};

export const updateLocalStore = (key, data) => {
    if(JSON.parse(localStorage.getItem(key)) === null) {
        localStorage.setItem(key, JSON.stringify({}))
    }

    switch (key) {
        case 'user':
            localStorage.setItem(key, JSON.stringify(data))
            break;
        case 'stripe':
            localStorage.setItem(key, JSON.stringify({...data}))
            break;
        default:
            return
    }
};

/**
 *
 * @param cart
 * @returns {{total: number, cQuantity: number, sub_total: number}}
 */
export const cartQuantity = (cart) => {
    let cQuantity = 0,
        sub_total = 0,
        total = 0; //sub_total plus tax and fees
    cart.map(item => {
        cQuantity += item.checked ? item.quantity : 0;
        sub_total += item.quantity * item.price;
        total += item.quantity * item.price;
    });
    return {
        cQuantity,
        sub_total: Number(sub_total.toFixed(2)),
        total: Number((total + (total * 0.07)).toFixed(2))
    };
};

/**
 *
 * @param cart - whole cart
 * @param payload - data to update the cart
 * @param indexToUpdate - in case just only update
 * @param q - quantity increase and decrease case
 * @returns cart updated
 */
export const updateCart = (cart, payload = null, indexToUpdate = null, q = null) => {
    if (payload !== null) {
        //cart item is empty
        if (!cart.item.length) {
            return {
                ...cart,
                item: [{
                    variation_id: payload.variation.id,
                    product_id: payload.product.product_id,
                    image: payload.product.image[0],
                    price: payload.variation.price,
                    color: payload.variation.color,
                    size: payload.variation.size,
                    name: payload.product.name,
                    checked: payload.variation.checked,
                    quantity: 1,
                }],
                last_update: Date.now(),
                quantity: 1,
                sub_total: payload.variation.price,
                total: payload.variation.price + (payload.variation.price * 0.07),//plus tax
            }
        } else {
            //target product exist
            if (indexToUpdate !== null) {
                cart.item[indexToUpdate] = {
                    ...cart.item[indexToUpdate],
                    quantity: cart.item[indexToUpdate].quantity + q
                }
                const {cQuantity, sub_total, total} = cartQuantity(cart.item);
                return {
                    ...cart,
                    last_update: Date.now(),
                    quantity: cQuantity,
                    sub_total: sub_total,
                    total: total,
                }
            } else {
                const tempCart = {
                    ...cart,
                    item: [...cart.item, {
                        variation_id: payload.variation.id,
                        product_id: payload.product.product_id,
                        image: payload.product.image[0],
                        price: payload.variation.price,
                        color: payload.variation.color,
                        size: payload.variation.size,
                        name: payload.product.name,
                        checked: payload.variation.checked,
                        quantity: 1,
                    }]
                }
                const {cQuantity, sub_total, total} = cartQuantity(tempCart.item);
                return {
                    ...tempCart,
                    last_update: Date.now(),
                    quantity: cQuantity,
                    sub_total: sub_total,
                    total: total,
                }
            }
        }
    } else {
        const {cQuantity, sub_total, total} = cartQuantity(cart.item);
        return {
            ...cart,
            last_update: Date.now(),
            quantity: cQuantity,
            sub_total: sub_total,
            total: total,
        }
    }
};

export const mergeTwoCart = (cart) => {
    return cart.reduce(function (hash) {
        return function (acc, curr) {
            if (!hash[curr.variation_id]) {
                hash[curr.variation_id] = { ...curr};
                acc.push(hash[curr.variation_id]);
            } else {
                hash[curr.variation_id].quantity = hash[curr.variation_id].quantity + curr.quantity;
            }
            return acc;
        };
    }(Object.create(null)), []);
};


export const AddToCart = (selectedColor, selectedSize, item, id, image, name, user) => {
    const variation = item.variation.filter(i => selectedColor === i.color && selectedSize === i.size);
    window.dispatch(userSliceActions.addToCart({
        variation: variation[0],
        product: {product_id: id, image, name},
        user
    }));
    window.displayNotification({
        t: 'success',
        c: 'Product add to the Cart'
    })
};

export const AddToWishlist = (product, user) => {
    if(user.dummy) {
        window.confirm({t: 'warning', c: `Sign In first to manage your 'Wishlist'`})
            .then(res=> {
                if(res) {
                    window.dispatch(generalSliceActions.setModal({open: true, who: 'login'}))
                }
            })
    } else {
        window.dispatch(userSliceActions.addToWishList({product, user}));
        window.displayNotification({
            t: 'success',
            c: `Product '${product.name}' add to the Wishlist`
        });
    }
};

export const clearModalWithTransition = (delay) => setTimeout(_ => {
    window.dispatch(generalSliceActions.setModal(''))
}, delay);

export const deletePaymentMethod = (pm, user, customer) => {
    window.confirm({t: 'info', c: 'Sure want to delete this Payment Method?'})
        .then(res => {
            if(res) {
                (async function () {
                    try {
                        const {deleted} = await fetchAPI(
                            url,
                            'detach-payment-method',
                            'POST',
                            {pm, customer: user.uid}
                        );
                        window.dispatch(getCustomerData({endpoint: 'retrieve-payment-method', customer}));
                        window.dispatch(stripeSliceActions.updatePaymentMethod(deleted.id));
                        window.displayNotification({
                            t: 'success',
                            c: `Your ${deleted.card.brand} ended in ${deleted.card.last4} was deleted`
                        })
                    } catch (e) {
                        debugger
                    }
                }())
            }
        })
}

export const calculateTotalFromCheckItems = (cart) => {
    const tempItem = cart.filter(item => item.checked)
    return tempItem.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
    }, 0)
}

export const prepareCheckedItemToServer = (item) => {
    return item.reduce((acc, curr) => {
    let {product_id, variation_id, quantity} = curr;
        if(curr.checked) {
            acc.push({
                product_id, variation_id, quantity
            })
        }
        return acc
    }, [])
}