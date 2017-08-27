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

export const postPurchase = (nonce, amount) => {
  debugger;
  console.log("in postPurchase");
  return fetch(URL + "/payment?action=purchase-item", {
    method: "POST",
    body:  JSON.stringify({
      nonce,
      amount
    })
  }).then(res => {
    let json = res.json();
    console.log(json);
    return json;
  });
};
