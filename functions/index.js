const credential = require('./firestore-credentials.json');
const express = require('express');
const app = express();
const functions = require('firebase-functions');
//stripe
const stripe = require('stripe')(process.env.STRIPE_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const admin = require('firebase-admin');
admin.initializeApp({credential: admin.credential.cert(credential)});
const db = admin.firestore();
//CORS
const cors = require('cors')({origin: '*'});
app.use(cors);
// Use JSON parser for all non-webhook routes
app.use(express.json());
const {appCheckVerification} = require('./checkToken');
const {listAllShippingOptions, retrieveCustomer, retrievePaymentMethod} = require("./stripe/Stripe");
const {UpdateProduct, UpdateDB, GetProductAndReturnTotalAmount} = require("./helper/Helper");
const {createId} = require("./helper/Common");

let orderData = {};

//Express
app.get('/test', (req, res) => {
    debugger
    res.send('Hello world');
});
app.get('/test-cached', (req, res) => {
    // debugger
    //to cache the data go from 400ms to 9ms
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.send('Hello world-cached');
});

// Stripe requires the raw body to construct the event
app.post('/webhook', (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    }
    catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const {amount, created, customer, receipt_email, charges, metadata } = event.data.object;
            const order = {
                userId: orderData.userId,
                receipt_email,
                amount,
                create_at: created,
                customer_id: customer,
                order_status: 'processing',
                shipping: charges.data[0].shipping,
                item: orderData.item
            }
            try {
                //create the order in db
                db.collection('orders').doc(metadata.idToCreateTheOrder).set({...order}, {merge: true}).then();

                //update product and variation statistics
                UpdateProduct(orderData.item).then()

                //send email to the customer
            } catch (e) {
                return res.status(400).send(`Error Update fb database ${e.message}`);
            }
            break;
        default:
            // Unexpected event type
            return res.status(400).end();
    }
    // Return a 200 response to acknowledge receipt of the event
    res.json({received: true});
});

//stripe
app.get('/retrieve-customer', appCheckVerification, retrieveCustomer);
app.get('/retrieve-payment-method', appCheckVerification, retrievePaymentMethod);
app.get('/list-all-shipping-option', appCheckVerification, listAllShippingOptions);

//charge a customer with 'payment method (pm_ client side)' and customer_id
app.post('/create-payment-intent', appCheckVerification, async (req, res) => {
    const {customer_id, item, shipping, email, tempAddress, userId} = req.body;
    const {address, city, zip, first_name, last_name, phone, country, state} = tempAddress[0];
    //get product from db and return calculated total amount
    const amount = await GetProductAndReturnTotalAmount(item);
    let fixAmount = +(amount.toFixed(2)),
        taxes = +((amount * 0.07).toFixed(2));
    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: +(((fixAmount + taxes + shipping) * 100).toFixed(2)),
            currency: 'usd',
            // Verify your integration in this guide by including this parameter
            metadata: {
                integration_check: 'accept_a_payment',
                idToCreateTheOrder: createId()
            },
            customer: customer_id,
            //send and email after the payment go successfully, only Live Mode
            receipt_email: email,
            shipping: {
                address: {
                    city,
                    country,
                    line1: address,
                    line2: '',
                    postal_code: zip,
                    state
                },
                name: `${first_name} ${last_name}`,
                carrier: 'Ground-FedEx',
                phone,
                tracking_number: 0
            }
        });
        orderData = {userId, item: [...item]}
        res.status(200).send({
            idToCreateTheOrder: paymentIntent.metadata.idToCreateTheOrder,
            clientSecret: paymentIntent.client_secret
        });
    } catch (e) {
        // debugger
        switch (e.type) {
            case 'StripeCardError':
                res.status(e.statusCode).json({error: e.message})
                break;
            case 'StripeInvalidRequestError':
                res.status(e.statusCode).json({error: e.message})
                break;
            default:
                res.status(e.statusCode).json({error: 'Another problem occurred, maybe unrelated to Stripe.'})
                break;
        }
    }
});

//save card to stripe without charging it
app.post('/create-payment-intent-to-save-a-card', appCheckVerification, async (req, res) => {
    try {
        const setupIntent = await stripe.setupIntents.create({
            customer: req.body.customer_id,
            payment_method_types: ['card'],
        });
        res.status(200).json({client_secret: setupIntent.client_secret});
    } catch (e) {
        debugger
        switch (e.type) {
            case 'StripeCardError':
                res.status(e.statusCode).json({error: e.message})
                break;
            case 'StripeInvalidRequestError':
                res.status(e.statusCode).json({error: e.message})
                break;
            default:
                res.status(e.statusCode).json({error: 'Another problem occurred, maybe unrelated to Stripe.'})
                break;
        }
    }
});

//update a card
app.post('/update-payment-method', async (req, res) => {
    debugger
})

//delete a card
app.post('/detach-payment-method', async (req, res) => {
    const {pm, customer} = req.body;
    try {
        const deleted = await stripe.paymentMethods.detach(pm);
        UpdateDB({pm}, customer, 'stripe_customers').then()
        return res.status(200).json({deleted})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})


//Done pm_
// app.post('/set-up-future-payment', async (req, res) => {
//     try {
//         const session = await stripe.checkout.sessions.create({
//             mode: 'setup',
//             payment_method_types: ['card'],
//             success_url: `http://localhost:3000/test`,
//             cancel_url: `http://localhost:3000/test`,
//             customer: req.body.customer_id
//         });
//         res.status(200).json({url: session.url})
//     } catch (e) {
//         res.status(500).json({error: e.message})
//     }
// });

//Done - pay directly
// app.post('/create-checkout-session', async (req, res) => {
//     // debugger
//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             line_items: req.body.map(item => {
//                 // debugger
//                 return {
//                     price_data: {
//                         currency: 'usd',
//                         product_data: {
//                             name: 'test',
//                         },
//                         unit_amount: item.price * 100,
//                     },
//                     quantity: item.quantity,
//                 }
//             }),
//             success_url: `http://localhost:3000/test`,
//             cancel_url: `http://localhost:3000/test`,
//         })
//         res.status(200).json({url: session.url})
//     } catch (e) {
//         res.status(500).json({error: e.message})
//     }
// });

exports.app = functions.https.onRequest(app);

//Cloud Functions
//done
exports.createStripeCustomer = functions.firestore
    .document('users/{userId}')
    .onCreate(async (snapshot, context) => {
        const user = snapshot.data();
        const customer = await stripe.customers.create({email: user.email, name: user.email.split('@')[0]});
        try {
            return await db.collection('stripe_customers').doc(context.params.userId).set({
                customer_id: customer.id,
                email: user.email,
                payment_method: []
            });
        } catch (e) {
            return e
        }
});

exports.updateProductReview = functions.firestore
    .document('reviews/{reviewId}')
    .onCreate(async (snapshot, context) => {
        debugger
        const product_id = snapshot.data().product_id;
        const productDocRef = await db.collection("products").doc(product_id).get();
        try {
            return productDocRef.ref.update({'statistic.total_review': admin.firestore.FieldValue.increment(1)})
        } catch (e) {
            return console.log(e)
        }
});

