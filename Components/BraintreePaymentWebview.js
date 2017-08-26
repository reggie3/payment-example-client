import React from "react";
import { Text, View, Button } from "react-native";
import { WebView } from "./rnwm-webview";
import * as brainTreeUtils from "../utils/braintreeUtils";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      message: null
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          onLoad={this.sendClientTokenToWebView}
          source={require("../dist/index.html")}
          style={{ flex: 1 }}
          ref={this._refWebView}
        />
      </View>
    );
  }

  _refWebView = webview => {
    this.webview = webview;
  };

  onMessage = event => {
    const { data } = event.nativeEvent;
    console.log({ data });
  };
  componentDidMount() {
    const { messagesChannel } = this.webview;

    messagesChannel.on("json", json => {
      if (json.type === "success") {
        console.log(`${json.payload}`);
        brainTreeUtils
          .postPurchase(json.payload.nonce, "10.00")
          .then(response => {
            console.log({ response });
            if (response.type === "success") {
              debugger;
            }
          });
      } else {
        alert(`payment error:
        ${json.err}`);
      }
    });
  }

  sendClientTokenToWebView = () => {
    this.webview.sendJSON({ clientToken: this.props.clientToken });
  };
}
