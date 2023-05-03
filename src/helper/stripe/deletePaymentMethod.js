import {fetchAPI} from "../FetchApi";
import {getCustomerData, url} from "./StripeApi";
import {stripeSliceActions} from "../../store/stripeSlice";
import PropTypes from "prop-types";

export default function deletePaymentMethod(pm, user, customer) {
    window.confirm({t: 'info', c: 'Sure want to delete this Payment Method?'})
        .then(res => {
            if(res) {
                (async function () {
                    try {
                        const {deleted} = await fetchAPI(
                            url,
                            'detach-payment-method',
                            'POST',
                            {pm, customer: user.uid}
                        );
                        window.dispatch(getCustomerData({endpoint: 'retrieve-payment-method', customer}));
                        window.dispatch(stripeSliceActions.updatePaymentMethod(deleted.id));
                        window.displayNotification({
                            t: 'success',
                            c: `Your ${deleted.card.brand} ended in ${deleted.card.last4} was deleted`
                        })
                    } catch (e) {
                        debugger
                    }
                }())
            }
        })
}

deletePaymentMethod.prototype = {
    pm: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired
}