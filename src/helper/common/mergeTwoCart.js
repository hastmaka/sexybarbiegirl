import PropTypes from "prop-types";

export default function mergeTwoCart(cart) {
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

mergeTwoCart.prototype = {
    cart: PropTypes.array.isRequired
}