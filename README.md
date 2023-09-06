# clicknpayMobilePayments

## Introduction

clicknpaymobile is a lightweight library that simplifies the integration of ClicknPay payment gateway with your Node.js web applications .Clicknpay OPEN API is a popular payment processor that allows merchants to accept ecocash and onemoney payments online securely and conveniently.

## Prerequisites

In order to make use of this project, the following prerequisites must be met for it to work.

1. Node version 0.6.0 and above
2. NPM (node's package manager, used to install the node library)
3. Axios (make sure axios is install because it is a dependency)

## Example code

```js
const Clicknpay = require("clicknpaymobile");
const payment = new clicknpay("Unique code from the dashboard", "paymentURL");

// initiate a mobile payement via USSD tot the customer
payment
  .mobilePayment("<Amount>", "<customer Phone number>", "Currency code")
  .then((data) => {
    // handle the response
  });
```

### Check transaction status

```js
payment
  .mobilePayment("<Amount>", "<customer Phone number>", "Currency code")
  .then((data) => {
    // handle the response
    payment.chechTransactionStatus(data).then((data) => {
      console.log(data);
    });
  });
```
