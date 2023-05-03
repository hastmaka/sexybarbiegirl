import PropTypes from "prop-types";

export default function sortPaymentMethod(stripePm, firebasePm) {
    let defaultPm = firebasePm.find(item => item.main);
    return [...stripePm].sort((x,y) => x['id'] === defaultPm.pm ? -1 : y['id'] === defaultPm.pm);
}

sortPaymentMethod.prototype = {
    stripePm: PropTypes.string.isRequired,
    firebasePm: PropTypes.string.isRequired
}