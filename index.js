const axios = require('axios');

function Clicknpaymoblie(uniqueId, paymentURL) {
    this.uniqueId = uniqueId;
    this.paymentURL = paymentURL;


    this.mobilePayment = async (amount, customerPhoneNumber, currencyCode) => {
        const ecocashUrl = `${this.paymentURL}/ecocashapi/initiate`;
        const netoneUrl = `${this.paymentURL}/onemoneyapi/initiate`;
        const econet = /^07[78]/; // regex for econet phone number
        const netone = /^071/; // regex for netone phone number
        let method;
        let response;

        if (econet.test(customerPhoneNumber)) {
            method = 'ecocash';
        } else if (netone.test(customerPhoneNumber)) {
            method = 'onemoney';
        }

        try {
            const data = {
                amount: amount,
                currency: currencyCode,
                endUserId: customerPhoneNumber,
                uniqueId: this.uniqueId,
                description: 'Mobile payment',
            };

            if (method === 'ecocash') {
                response = await axios.post(ecocashUrl, data);
            } else if (method === 'onemoney') {
                response = await axios.post(netoneUrl, data);
            }
            return response?.data;
        } catch (error) {
            console.log(error);
            return error
        }

    }


    // use the resonse from the mobile payment function
    this.chechTransactionStatus = async (res) => {
        const ecocashUrl = `https://backendservices.clicknpay.africa:2081/ecocashapi/status/${res.enduserId}/${res.clientCorrelator}`;
        const netoneUrl = `https://backendservices.clicknpay.africa:2081/onemoneyapi/status/${res.endUserId}/${res.clientCorrelator}`;

        const econet = /^7[78]/; // regex for econet phone number
        const netone = /^71/; // regex for netone phone number

        let method;
        let response;

        if (econet.test(res.endUserId)) {
            method = 'ecocash';
        } else if (netone.test(res.endUserId)) {
            method = 'onemoney';
        }

        if (method === 'ecocash') {
            response = await axios.get(ecocashUrl);
        } else if (method === 'onemoney') {
            response = await axios.post(netoneUrl);
        }

        return response?.data;


    }
}

module.exports = Clicknpaymoblie
