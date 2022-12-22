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
                    if (r.id === param.product_id) {
                        let hasProperty = param.variation_id in tProd.statistic.sales
                        tProd.statistic = {
                            ...tProd.statistic,
                            sales: {
                                ...tProd.statistic.sales,
                                [param.variation_id]: hasProperty ? tProd.statistic.sales[param.variation_id] + param.quantity : param.quantity
                            }
                        }
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
};

const UpdateDB = async (data, idRef, who) => {
    const tempData = await db.collection(who).doc(idRef).get();
    let dataUpdated = {};
    switch (who) {
        case 'stripe_customers':
            const {payment_method, ...stripeCustomerRest} = tempData.data();
            dataUpdated = {payment_method: payment_method.filter(item => item.pm !== data.pm), ...stripeCustomerRest}
            break;
        default:
            return

    }
    tempData._ref.set(dataUpdated, {merge: true})
};

const GetProductAndReturnTotalAmount = async (item) => {
    // debugger
    //check how many product we have to query
    let productToQuery = item.reduce((acc, curr) => {
        if(!acc[curr.product_id]) {
            acc[curr.product_id] = curr.product_id
        }
        return acc
    }, {})
    let promise = Object.keys(productToQuery).map(async value => {
        return await db.collection('products').doc(value).get()
    })

    let tempPrice = [];

    await Promise.all(promise)
        .then(res => {
            res.forEach(r => {
                let sProduct = {...r.data(), id: r.id};
                //get each variation and add every price * quantity
                item.forEach(cItem => {
                    if(cItem.product_id === sProduct.id) {
                        sProduct.variation.forEach(variation => {
                            if(cItem.variation_id === variation.id ) {
                                tempPrice.push(variation.price * cItem.quantity)
                            }
                        })
                    }
                })
            })
        }).catch(err => {
            return err
        })
    //calc and return total price
    return  tempPrice.reduce((acc, curr) => {return acc + curr}, 0)
}

module.exports = {UpdateProduct, UpdateDB, GetProductAndReturnTotalAmount}