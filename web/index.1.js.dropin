import RNMessageChannel from "./react-native-webview-messaging";
const dropin = require("braintree-web-drop-in");

const button = document.querySelector("#submit-button");
let clientToken = "";

RNMessageChannel.on("json", json => {
  clientToken = json.clientToken;

  dropin
    .create({
      authorization: clientToken,
      container: "#dropin-container"
    })
    .then(instance => {
      // alert(`instance: ${JSON.stringify(instance)}`);
      button.addEventListener("click", function() {
        instance.requestPaymentMethod(function(err, payload) {
          // Submit payload.nonce to your server
            //alert(`payload: ${JSON.stringify(payload)}`);
        });
      });
    })
    .catch(function(err) {
      // Handle any errors that might've occurred when creating Drop-in
      console.error(err);
    });
});
