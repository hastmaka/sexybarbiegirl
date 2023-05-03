import PropTypes from "prop-types";

export default function getCurrentPriceAndDiscount(selected) {
    let variation = selected.variationToRender.find(item =>
        item.color === selected.selectedColor && item.size === selected.selectedSize)
    return {price: variation.price, discount: variation.discount}
}

getCurrentPriceAndDiscount.prototype = {
    selected: PropTypes.object.isRequired
}