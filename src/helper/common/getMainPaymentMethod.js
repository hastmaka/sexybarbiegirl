import PropTypes from "prop-types";

export default function getMainPaymentMethod(customer) {
    // debugger
    return customer.paymentMethod.data.filter(item => {
        if(customer.payment_method.length) {
            let main = customer.payment_method.find(item => item.main).pm;
            return main === item.id
        } else {
            return item
        }
    });
}

getMainPaymentMethod.prototype = {
    customer: PropTypes.object.isRequired
}