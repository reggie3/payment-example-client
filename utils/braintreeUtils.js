import Secrets from '../secrets';
const URL = Secrets.API_URL;

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
