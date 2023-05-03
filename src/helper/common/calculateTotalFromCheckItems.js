import PropTypes from "prop-types";

export default function calculateTotalFromCheckItems(cart) {
    const tempItem = cart.filter(item => item.checked)
    return tempItem.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
    }, 0)
}

calculateTotalFromCheckItems.prototype = {
    cart: PropTypes.array.isRequired
}