import React from "react";
import { Text, View, Button, WebView } from "react-native";
import * as brainTreeUtils from "../utils/braintreeUtils";
import { connect } from "react-redux";
import actions from "../actions/actions";

class BraintreePaymentWebview extends React.Component {
  constructor() {
    super();

    this.state = {
      message: null
    };
  }

  _refWebView = webview => {
    this.webview = webview;
  };

  onMessage = event => {
    const { data } = event.nativeEvent;
    console.log({ data });
  };

  componentDidMount() {
    // tell the webview to initalize itself
    console.log("posting message");
    this.webview.postMessage({
      msg: "init",
      payload: {
        customerID: this.props.hasOwnProperty("customerID")
          ? this.props.customerID
          : null,
        merchantAccountID: this.props.hasOwnProperty("merchantAccountID")
          ? this.props.merchantAccountID
          : null
      }
    });
  }

  sendClientTokenToWebView = () => {
    this.webview.postMessage({
      msg: "clientToken",
      payload: { clientToken: this.props.clientToken }
    });
  };

  onMessage(event) {
    debugger;
    console.log("On Message", event.nativeEvent.data);
  }

  _refWebView = webview => {
    console.log("setting reference");
    this.webview = webview;
    debugger;
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
          onLoad={this.sendClientTokenToWebView}
          source={require("../dist/index.html")}
          style={{ flex: 1 }}
          ref={webview => (this.webview = webview)}
          onMessage={this.onMessage}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign(
    {},
    {
      cart: state.cart
    }
  );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  BraintreePaymentWebview
);
