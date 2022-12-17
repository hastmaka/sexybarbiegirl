const admin = require('firebase-admin');
const db = admin.firestore();

const UpdateProduct = async (orderItem) => {
    let prodParams = orderItem.map(item => {
        return {
            product_id: item.product_id,
            variation_id: item.variation_id,
            quantity: item.quantity
        }
    })

    let productToUpdate = prodParams.map(async item => {
        return await db.collection('products').doc(item.product_id).get()
    })

    await Promise.all(productToUpdate)
        .then(res => {
            res.forEach(r => {
                let tProd = r.data()
                prodParams.map(param => {
                    if(r.id === param.product_id) {
                        tProd.statistic = {...tProd.statistic, sales: tProd.statistic.sales + param.quantity}
                        let varToUpdate = tProd.variation.findIndex(v => v.id === param.variation_id);
                        tProd.variation[varToUpdate] = {
                            ...tProd.variation[varToUpdate],
                            stock: tProd.variation[varToUpdate].stock - param.quantity
                        }
                    }
                    return r._ref.set(tProd, {merge: true})
                })
            })
        }).catch(e => {
            return e
        })
}

const UpdateDB = async (data, idRef, who) => {
    const tempData = await db.collection(who).doc(idRef).get();
    let dataUpdated = {};
    switch (who) {
        case 'stripe_customers':
            const {payment_method, ...stripeCustomerRest} = tempData.data();
            dataUpdated = {payment_method: payment_method.filter(item => item.pm !== data.pm), ...stripeCustomerRest}
            break;
        case 'users':
            const {order, ...userRest} = tempData.data();
            dataUpdated = {
                order: [{
                    orderId: data.orderId,
                    status: 'processing'
                }],
                ...userRest
            }
            break;
        default:
            return

    }
    tempData._ref.set(dataUpdated, {merge: true})
}

module.exports = {UpdateProduct, UpdateDB}