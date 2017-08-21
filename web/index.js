import RNMessageChannel from "react-native-webview-messaging";

var button = document.querySelector("#submit-button");
const messagesContainer = document.querySelector("p");

function CreateBraintreeDropin(clientToken) {
  braintree.dropin.create(
    {
      authorization: clientToken,
      container: "#dropin-container"
    },
    function(createErr, instance) {
      if (createErr) {
        alert(createErr);
      } else {
        alert(instance);
        button.addEventListener("click", function() {
          alert("button clicked");
          instance.requestPaymentMethod(function(err, payload) {
            if (err) {
              alert(err);
            } else {
              alert(payload);
            }
          });
        });
      }
    }
  );
}

RNMessageChannel.on("json", text => {
  alert(`Received json from RN: ${JSON.stringify(text)}`);
  messagesContainer.innerHTML = `Received json from RN: ${JSON.stringify(
    text
  )}`;
});

RNMessageChannel.on("tokenReceived", event => {
  alert(`Received json from RN: ${JSON.stringify(event)}`);
  messagesContainer.innerHTML = `Received "greetingFromRN" event: ${JSON.stringify(
    event
  )}`;
});
