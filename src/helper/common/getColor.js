import PropTypes from "prop-types";

export default function getColor(variation) {
    let tempV = [];
    Object.entries(variation).map(item => tempV.push(item[0]));
    return tempV
};

getColor.prototype = {
    variation: PropTypes.object.isRequired
}