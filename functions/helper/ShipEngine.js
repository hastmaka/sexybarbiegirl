const ShipEngine = require('shipengine');
const shipengine = new ShipEngine('TEST_Z4Ei+tx7wi6CS98ekBfcfVxbGAur5n38cX7MDCxOGBY');

module.exports = {
    listCarriers: async () => {
        try {
            return await shipengine.listCarriers();
        } catch (err) {
            return err.message
        }
    },

    /**
     * @param address=[{}]
     * "name": null,
     * "phone": null,
     * "companyName": null,
     * "addressLine1": "525 S Winchester Blvd",
     * "addressLine2": null,
     * "addressLine3": null,
     * "cityLocality": null,
     * "stateProvince": null,
     * "postalCode": "15128",
     * "countryCode": "US",
     * "addressResidentialIndicator": "unknown"
     * @returns {Promise<*|undefined|Result>}
     */
    validateAddresses: async (address) => {
        try {
            return await shipengine.validateAddresses([...address]);

        } catch (err) {
            console.log("Error validating address: ", err.message);
        }
    },

    getRatesWithShipmentDetails: async (params) => {
        try {
            const rates = await shipengine.getRatesWithShipmentDetails(params);
            const tempData = [];
            rates.rateResponse.rates.map(item => {
                if (item.packageType === 'small_flat_rate_box' && item.serviceCode === 'usps_priority_mail')tempData.push(item)
                if (item.packageType === 'package' && item.serviceCode === 'usps_parcel_select')tempData.push(item)
            })
            return tempData;
        } catch (err) {
            console.log("Error creating rates: ", err.message);
        }
    }
}