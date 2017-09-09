import React from "react";
import { View } from "react-native";
import { WebView } from "./rnwm-webview";
import PropTypes from "prop-types";

export default class BraintreePaymentWebview extends React.Component {
  constructor() {
    super();

    this.state = {
      paymentAPIResponse: null
    };
  }
  componentDidMount() {
    // register listeners to listen for events from the html
    // we'll receive a nonce once the requestPaymentMethodComplete is completed
    this.registerMessageListeners();
  }

  registerMessageListeners = () => {
    const { messagesChannel } = this.webview;

    messagesChannel.on("RETRIEVE_NONCE_PENDING", event => {
      console.log("RETRIEVE_NONCE_PENDING");
    });

    messagesChannel.on("RETRIEVE_NONCE_FULFILLED", event => {
      console.log("RETRIEVE_NONCE_FULFILLED");
      debugger
      this.props.nonceObtainedCallback(event.payload.response.nonce);
    });

    messagesChannel.on("RETRIEVE_NONCE_REJECTED", event => {
      console.log("RETRIEVE_NONCE_REJECTED");
    });

    messagesChannel.on("goBack", () => {
      this.props.navigationBackCallback();
    });
  };

  // send the client token to HTML file to begin the braintree flow
  // called when the HTML in the webview is loaded
  sendClientTokenToHTML = () => {
    this.webview.emit("TOKEN_RECEIVED", {
      payload: {
        clientToken: this.props.clientToken,
        options: this.props.options
      }
    });
  };

  // handle purchase responses that parent component sends after making purchase API call
  handlePurchaseResponse = response => {
    console.log("handlePurchaseResponse");
    if (response === "purchaseSuccess") {
      console.log("emitting purchaseSuccess");
      this.webview.emit("purchaseSuccess");
    } else {
      this.webview.emit("error");
    }
  };

  componentWillReceiveProps = nextProps => {
    console.log({ nextProps });
    if (nextProps.paymentAPIResponse !== this.state.paymentAPIResponse) {
      console.log(nextProps.paymentAPIResponse);
      this.setState({ paymentAPIResponse: nextProps.paymentAPIResponse });
      this.handlePurchaseResponse(nextProps.paymentAPIResponse);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: `blue`
        }}
      >
        <WebView
          onLoad={this.sendClientTokenToHTML}
          source={require("../dist/index.html")}
          style={{ flex: 1 }}
          ref={component => (this.webview = component)}
        />
      </View>
    );
  }
}

BraintreePaymentWebview.propTypes = {
  options: PropTypes.object,
  clientToken: PropTypes.string.isRequired,
  // paymentAPIResponse: PropTypes.string.isRequired,
  nonceObtainedCallback: PropTypes.func.isRequired,
  navigationBackCallback: PropTypes.func
};

BraintreePaymentWebview.defaultProps = {
  options: {}
};