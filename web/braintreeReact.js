// download and use react an react-dom from local directory
// to avoid conflicts with Expo version of react
import React from "./react.min";
import ReactDOM from "./react-dom.min";
import renderIf from "render-if";
import { Spinner } from "react-activity";
import dropin from "braintree-web-drop-in";
import glamorous from "glamorous";
import RNMessageChannel from "./react-native-webview-messaging";
const util = require("util");

const DropInContainer = glamorous.div({
  flex: 1
});
const ButtonContainer = glamorous.div({
  flex: 1
});
const Button = glamorous.div({
  borderRadius: "2px",
  padding: "2px 10px 2px 10px",
  backgroundColor: "#2ecc71",
  fontSize: "1.25em",
  color: "white",
  fontFamily: "arial",
  boxShadow: "0 1px 4px rgba(0, 0, 0, .6)",
  textAlign: "center"
});
const PaymentBackground = glamorous.div({
  backgroundColor: "#FED2F1",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column"
});

// from user Dryymoon at this Github thread
// : https://github.com/facebook/react-native/issues/11594
// fixes issue that caused postMessage to not reach WebView
function awaitPostMessage() {
  let isReactNativePostMessageReady = !!window.originalPostMessage;
  const queue = [];
  let currentPostMessageFn = function store(message) {
    if (queue.length > 100) queue.shift();
    queue.push(message);
  };
  if (!isReactNativePostMessageReady) {
    // const originalPostMessage = window.postMessage;
    Object.defineProperty(window, "postMessage", {
      configurable: true,
      enumerable: true,
      get() {
        return currentPostMessageFn;
      },
      set(fn) {
        currentPostMessageFn = fn;
        isReactNativePostMessageReady = true;
        setTimeout(sendQueue, 0);
      }
    });
  }

  function sendQueue() {
    while (queue.length > 0) window.postMessage(queue.shift());
  }
}

// print something in an html element
const PrintElement = data => {
  if (typeof data === "object") {
    let el = document.createElement("pre");
    el.innerHTML = util.inspect(data, { showHidden: false, depth: null });
    document.getElementById("messages").appendChild(el);
  } else if (typeof data === "string") {
    let el = document.createElement("pre");
    el.innerHTML = data;
    document.getElementById("messages").appendChild(el);
  }
};

class BraintreeHTML extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPaymentStatus: null
    };
  }

  componentWillMount = () => {
    // awaitPostMessage();
  };

  componentWillUnmount = () => {};

  componentDidMount = () => {
    PrintElement("componentDidMount success");
    this.registerMessageListeners();
  };

  /*******************************
   * add event listeners to receive events from parent
  */
  registerMessageListeners = () => {
    PrintElement("registering message listeners");

    // should receive client token message almost immediately upon mounting
    RNMessageChannel.on("TOKEN_RECEIVED", event => {
      PrintElement(event);
      if (event.payload.options.creditCard) {
        this.createCreditCardUI(event.payload.clientToken);
      }
      if (event.payload.options.paypal) {
        this.createPaypalUI(event.payload.clientToken);
      }
    });

    // when the call is made to the braintree purchasing server
    // used to show the user some feedback that the purchase is in process
    RNMessageChannel.on("PURCHASE_PENDING", event => {
      PrintElement("PURCHASE_PENDING");
    });

    // when the purchase succeeds
    // used to show the user some feedback that the purchase has completed successfully
    RNMessageChannel.on("PURCHASE_FULFILLED", event => {
      PrintElement("PURCHASE_FULFILLED");
    });

    // when the purchase succeeds
    // used to show the user some feedback that the purchase has failed to complete
    RNMessageChannel.on("PURCHASE_REJECTED", event => {
      PrintElement("PURCHASE_REJECTED");
    });

    PrintElement("registering message listeners - completed");
  };

  /*******************************
   * create the Paypal payment UI element
  */
  createPaypalUI = clientToken => {
    console.log("Not implmented");
  };

  /*******************************
   * create the Braintree UI element
  */
  createCreditCardUI = clientToken => {
    PrintElement(`createCreditCardUI: ${clientToken}`);

    dropin
      .create({
        authorization: clientToken,
        container: "#dropin-container"
      })
      .then(instance => {
        PrintElement(instance);
        this.setState({ instance });
      })
      .catch(function(err) {
        // Handle any errors that might've occurred when creating Drop-in
        RNMessageChannel.sendJSON({
          type: "error",
          err
        });
      });
  };
  /***********************************************
  *  handler for when the purchase button is clicke
  */
  handleSubmitPurchaseButtonClicked = () => {
    // PrintElement(`handleSubmitPurchaseButtonClicked: ${this.state.instance}`);

    // send a message to the parent WebView so that it
    // can display feedback to user
    RNMessageChannel.emit("RETRIEVE_NONCE_PENDING", {
      payload: {
        type: "success"
      }
    });

    // request a purchase nonce from the Braintree server
    this.state.instance.requestPaymentMethod(function(err, response) {
      if (err) {
        // notify the parent WebView if there is an error
        RNMessageChannel.emit("RETRIEVE_NONCE_REJECTED", {
          payload: {
            type: "error",
            err
          }
        });
      } else {
        // pass the nonce to the parent WebView if the purchase is successful
        RNMessageChannel.emit("RETRIEVE_NONCE_FULFILLED", {
          payload: {
            type: "success",
            response
          }
        });
      }
    });
  };

  render = () => {
    return (
      <PaymentBackground
        ref={component => {
          this.webComponent = component;
        }}
      >
        <DropInContainer>
          <div id="dropin-container" />
        </DropInContainer>
        <ButtonContainer>
          <Button
            id="submit-button"
            onClick={this.handleSubmitPurchaseButtonClicked}
          >
            Submit Purchase
          </Button>
          <div id="messages" />
        </ButtonContainer>
      </PaymentBackground>
    );
  };
}

ReactDOM.render(<BraintreeHTML />, document.getElementById("root"));
