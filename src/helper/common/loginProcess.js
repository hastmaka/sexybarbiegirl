import {updateCartApi} from "../firebase/FirestoreApi";
import {userSliceActions} from "../../store/userSlice";
import {generalSliceActions} from "../../store/gs-manager-slice";
import PropTypes from "prop-types";
import {mergeTwoCart, updateCart} from "./index";

/**
 *
 * @param token - token to send all request
 * @param dbUser - current user from db
 * @param modal - state of the login section
 * @param navigate
 * @param location
 * @param setLoading
 * @returns {Promise<unknown>}
 */
export default function loginProcess({token, dbUser, modal, navigate, location, setLoading}){
    return new Promise((resolve, reject) => {
        try {
            if(!dbUser.dummy) {
                const {cart, ...rest} = dbUser;
                const tempCart = JSON.parse(localStorage.getItem('user')).cart;
                if (tempCart.item.length > 0) {
                    cart.item = cart.item.length > 0 ? mergeTwoCart([...tempCart.item, ...cart.item]) : [...tempCart.item];
                    const cartUpdated = updateCart(cart);
                    updateCartApi(dbUser.uid, cartUpdated);
                    window.dispatch(userSliceActions.setUser({
                        ...rest,
                        cart: {...cartUpdated},
                        token
                    }));
                    if(modal) {
                        window.dispatch(generalSliceActions.closeModal())
                    }
                    navigate(location.pathname === '/checkout' ? '/checkout' : '/')
                    setLoading(false);
                    resolve()
                } else {
                    if(modal) {
                        window.dispatch(generalSliceActions.closeModal())
                    }
                    window.dispatch(userSliceActions.setUser({
                        ...dbUser,
                        token
                    }))
                    navigate('/');
                    setLoading(false);
                    resolve();
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

loginProcess.prototype = {
    token: PropTypes.string.isRequired,
    dbUser: PropTypes.object.isRequired,
    modal: PropTypes.bool,
    navigate: PropTypes.func.isRequired,
    location: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
}