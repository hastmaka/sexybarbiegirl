import {generalSliceActions} from "../store/gs-manager-slice";
import {userSliceActions} from "../store/userSlice";

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
    return Date.now() * Math.random()
};

export const handleDecimalsOnValue = (value) => {
    // eslint-disable-next-line
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
};

export const formatSizeArray = (s, i) => {
    return (i ? ', ' : '') + `${s === 1 ? 'XS' : s === 2 ? 'S' : s === 3 ? 'M' : s === 4 ? 'L' : s === 5 ? 'XL' : ''}`
};

export const updateLocalStore = (key, data, to) => {
    if(JSON.parse(localStorage.getItem(key)) === null) {
        localStorage.setItem(key, JSON.stringify({}))
    }
    let temp = JSON.parse(localStorage.getItem(key));

    switch (to) {
        case 'setUser':
            localStorage.setItem(key, JSON.stringify(data))
            break;
        case 'token':
            debugger
            temp[to] = data;
            localStorage.setItem(key, JSON.stringify(temp))
            break;
        case 'wish_list':
        case 'address':
        case 'orders':
            temp[to] = [...data]
            localStorage.setItem(key, JSON.stringify(temp))
            break;
        case 'cart':
            temp[to] = {...data}
            localStorage.setItem(key, JSON.stringify(temp))
            break;
        case 'stripe':
            localStorage.setItem(key, JSON.stringify({...data}))
            break;
        default:
            return
    }
};

export const cartQuantity = (cart) => {
    let cQuantity = 0,
        sub_total = 0,
        total = 0; //sub_total plus tax and fees
    cart.map(item => {
        cQuantity += item.quantity;
        sub_total += item.quantity * item.price;
        total += item.quantity * item.price;
    });
    return {
        cQuantity,
        sub_total: Number(sub_total.toFixed(2)),
        total: Number(total.toFixed(2))
    };
};

export const updateCart = (cart, payload = null, indexToUpdate = null, q = null) => {
    if (payload !== null) {
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
                    quantity: 1,
                }],
                last_update: Date.now(),
                quantity: 1,
                sub_total: payload.variation.price,
                total: payload.variation.price,//plus tax
            }
        } else {
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
    window.displayNotification({type: 'success', content: 'Product add to the Cart'})
};

export const AddToWishlist = (product, user) => {
    if(user.dummy) {
        window.confirm({type: 'warning', content: `Sign In first to manage your 'Wishlist'`})
            .then(res=> {
                if(res) {
                    window.dispatch(generalSliceActions.setModal({open: true, who: 'login'}))
                }
            })
    } else {
        window.dispatch(userSliceActions.addToWishList({product, user}));
        window.displayNotification({type: 'success', content: `Product '${product.name}' add to the Wishlist`})
    }
};

export const clearModalWithTransition = (delay) => setTimeout(_ => {
    window.dispatch(generalSliceActions.setModal(''))
}, delay);
