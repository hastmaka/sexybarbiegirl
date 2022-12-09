//stripe
const stripe = require('stripe')(process.env.STRIPE_KEY);
const listAllShippingOptions = async (req, res) => {
    try {
        const shippingRates = await stripe.shippingRates.list({
            limit: 3,
        });
        res.status(200).json({shippingRates})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

const retrieveCustomer = async (req, res) => {
    try {
        const customer = await stripe.customers.retrieve(
            JSON.parse(req.headers.data).customer_id
        );
        res.status(200).json({customer})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

const retrievePaymentMethod = async (req, res) => {
    try {
        const paymentMethods = await stripe.customers.listPaymentMethods(
            JSON.parse(req.headers.data).customer_id,
            {type: 'card'}
        );
        res.status(200).json({paymentMethods})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

module.exports = {listAllShippingOptions, retrieveCustomer, retrievePaymentMethod}