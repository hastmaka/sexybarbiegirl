import {fetchAPI} from "./FetchApi";
import {url} from "./stripe/StripeApi";

export const validateAddress = (address, token) => {
    // debugger
    return new Promise((resolve, reject) => {
        fetchAPI(url, 'validate-address', 'POST', [{...address}], token).then(res => {
            if(res[0].status === 'error') {
                resolve({
                    status: res[0].status,
                    message: res[0].messages[0].message
                })
            }
            if(res[0].status === 'verified') {
                if(res[0].messages.length) {
                    resolve({
                        status: 'error',
                        message: res[0].messages[0].message
                    })
                } else {
                    resolve({
                        status: res[0].status,
                        normalizedAddress: res[0].normalizedAddress
                    })
                }
            }
        })
    })
}

export const getRates = (params, token) => {
    debugger
    return new Promise((resolve, reject) => {
        fetchAPI(url, 'get-rates', 'POST', [{...params}]).then(res => {
            debugger
        }, token)
    })
}

export const shipEngineToDb = (address) => {
    let cleanObj = {};
    for (const [key, value] of Object.entries(address)) {
        if(key === 'addressLine1')cleanObj.address_line_1 = value
        if(key === 'cityLocality')cleanObj.city_locality = value
        if(key === 'stateProvince')cleanObj.state_province = value
        if(key === 'postalCode')cleanObj.postal_code = value.substring(0,5)
        if(key === 'countryCode')cleanObj.country_code = value
    }
    return cleanObj;
}

export const DbToShipEngine = (address) => {
    let cleanObj = {};
    for (const [key, value] of Object.entries(address[0])) {
        if(key === 'address_line_1')cleanObj.addressLine1 = value
        if(key === 'city_locality')cleanObj.cityLocality = value
        if(key === 'state_province')cleanObj.stateProvince = value
        if(key === 'postal_code')cleanObj.postalCode = value.substring(0,5)
        if(key === 'country_code')cleanObj.countryCode = value
    }
    return cleanObj;
}

export const initialAddressFormData = {
    first_name: '',
    last_name: '',
    phone: '',
    address_line_1: '',
    city_locality: '',
    state_province: '',
    postal_code: '',
    country_code: '',
    id: ''
}