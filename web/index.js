import RNMessageChannel from "react-native-webview-messaging";

var button = document.querySelector("#submit-button");

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

RNMessageChannel.on("text", text => {
  messagesContainer.innerHTML = `Received text from RN: ${text}`;
});

/* helloBtn.addEventListener('click', () => {
  RNMessageChannel.send('hello');
});

jsonBtn.addEventListener('click', () => {
  RNMessageChannel.sendJSON({
    payload: 'hello'
  });
});

eventBtn.addEventListener('click', () => {
  RNMessageChannel.emit('greetingFromWebview', {
    payload: 'hello'
  });
});





RNMessageChannel.on('greetingFromRN', event => {
  messagesContainer.innerHTML = `Received "greetingFromRN" event: ${JSON.stringify(event)}`;
}); */
