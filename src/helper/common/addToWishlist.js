import Login from "../../sections/login/Login";
import {userSliceActions} from "../../store/userSlice";
import {openModal} from "./index";
import PropTypes from "prop-types";

export default function addToWishlist(product, user) {
    if(user.dummy) {
        window.confirm({t: 'warning', c: `Sign In first to manage your 'Wishlist'`})
            .then(res=> {
                if(res) {
                    openModal(<Login modal/>)
                }
            })
    } else {
        window.dispatch(userSliceActions.addToWishList({product, user}));
        window.displayNotification({
            t: 'success',
            c: `Product '${product.name}' add to the Wishlist`
        });
    }
};

addToWishlist.prototype = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}