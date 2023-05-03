import PropTypes from "prop-types";

export default function updateLocalStore(key, data) {
    if(JSON.parse(localStorage.getItem(key)) === null) {
        localStorage.setItem(key, JSON.stringify({}))
    }
    switch (key) {
        case 'user':
            const {token, email, uid, address, role, ...rest} = data;
            localStorage.setItem(key, JSON.stringify(rest))
            break;
        case 'stripe':
            // localStorage.setItem(key, JSON.stringify({...data}))
            break;
        default:
            return
    }
};

updateLocalStore.prototype = {
    key: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
}