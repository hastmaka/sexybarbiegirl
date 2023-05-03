import PropTypes from "prop-types";

export default function getVariation(variation) {
    let tempA = [];
    variation.reduce((acc, curr) => {
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

getVariation.prototype = {
    variation:PropTypes.array.isRequired
}