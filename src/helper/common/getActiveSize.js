import PropTypes from "prop-types";

export default function getActiveSize(variation) {
    const active = variation.find(item => item.stock > 1)
    return active.size;
};

getActiveSize.prototype = {
    variation: PropTypes.object.isRequired
}