import RNMessageChannel from "./react-native-webview-messaging";
const dropin = require("braintree-web-drop-in");

const button = document.querySelector("#submit-button");
let clientToken = "";

RNMessageChannel.on("json", json => {
  clientToken = json.clientToken;

  var submitBtn = document.getElementById("my-submit");
  var form = document.getElementById("my-sample-form");

  braintree.client.create(
    {
      authorization: clientToken
    },
    clientDidCreate
  );

  function clientDidCreate(err, client) {
    braintree.hostedFields.create(
      {
        client: client,
        styles: {
          input: {
            "font-size": "16pt",
            color: "#3A3A3A"
          },

          ".number": {
            "font-family": "monospace"
          },

          ".valid": {
            color: "green"
          }
        },
        fields: {
          number: {
            selector: "#card-number"
          },
          cvv: {
            selector: "#cvv"
          },
          expirationDate: {
            selector: "#expiration-date"
          }
        }
      },
      hostedFieldsDidCreate
    );
  }

  function hostedFieldsDidCreate(err, hostedFields) {
    submitBtn.addEventListener("click", submitHandler.bind(null, hostedFields));
    submitBtn.removeAttribute("disabled");
  }

  function submitHandler(hostedFields, event) {
    event.preventDefault();
    submitBtn.setAttribute("disabled", "disabled");

    hostedFields.tokenize(function(err, payload) {
      if (err) {
        submitBtn.removeAttribute("disabled");
        console.error(err);
      } else {
        form["payment_method_nonce"].value = payload.nonce;
        form.submit();
      }
    });
  }
});
