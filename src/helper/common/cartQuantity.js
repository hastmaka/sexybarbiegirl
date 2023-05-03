import PropTypes from "prop-types";

/**
 *
 * @param cart
 * @returns {{total: number, cQuantity: number, sub_total: number}}
 */
export default function cartQuantity(cart) {
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

cartQuantity.prototype = {
    cart: PropTypes.array.isRequired
}