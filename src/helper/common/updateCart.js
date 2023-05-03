import PropTypes from "prop-types";
import {cartQuantity} from "./index";

/**
 * @param cart - whole cart
 * @param payload - data to update the cart
 * @param indexToUpdate - in case just only update
 * @param q - quantity increase and decrease case
 * @returns cart updated
 */
export default function updateCart(cart, payload = null, indexToUpdate = null, q = null) {
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

updateCart.prototype = {
    cart: PropTypes.array.isRequired,
    payload: PropTypes.object,
    indexToUpdate: PropTypes.number,
    q: PropTypes.number,
}