import {doc, setDoc} from "firebase/firestore";
import {db} from "../firebase/FirebaseConfig";
import PropTypes from "prop-types";

/**
 * @param user - user returned after the register process
 * @returns {Promise<*|string>}
 */
export default async function createAccountProcess (user) {
    const userTemp = JSON.parse(localStorage.getItem('user'))
    userTemp.email = user.email;
    userTemp.address = [];
    userTemp.full_name = user.displayName || '';
    userTemp.role = 2;
    userTemp.dummy = false;
    userTemp.provider = user.providerData[0].providerId;
    userTemp.cart = {
        item: [],
        create_at: Date.now(),
        last_update: Date.now(),
        quantity: 0,
        sub_total: 0,
        total: 0,
    }
    userTemp.wish_list = [];
    try{
        await setDoc(doc(db, 'users', user.uid), userTemp);
        return ('created')
    } catch (err) {
        return(err)
    }
}

createAccountProcess.prototype = {
    user: PropTypes.object.isRequired
}