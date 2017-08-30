var client = require("braintree-web/client");
const URL = `https://o2ouqqruk2.execute-api.us-east-1.amazonaws.com/prod`;

export const getClientToken = () => {

  return fetch(URL + "/payment?action=get-client-token", {
    method: "POST"
  }).then(res => {
    let json = res.json();
    console.log(json);
    return json;
  });
};

export const postPurchase = item => {
  return fetch(URL + "/payment?action=purchase-item", {
    method: "POST",
    body: {
      item
    }
  }).then(res => {
    let json = res.json();
    console.log(json);
    return json;
  });
};


export const getPurchaseNonce =(item)=>{
    braintree.dropin.create({
      authorization: 'CLIENT_TOKEN_FROM_SERVER',

    }, function (createErr, instance) {
        debugger;
      button.addEventListener('click', function () {
        instance.requestPaymentMethod(function (err, payload) {
          // Submit payload.nonce to your server
        });
      });
    });
}